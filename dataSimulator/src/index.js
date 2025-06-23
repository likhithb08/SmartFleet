import {Kafka} from 'kafkajs'
import dotenv from 'dotenv'

dotenv.config()

const kafka = new Kafka({
    clientId : 'gps-simulator',
    brokers : [process.env.KAFKA_BROKER || 'localhost:9092']
})

const producer = kafka.producer()

const drivers = ['D1' , 'D2', 'D3']

function generateRandomGPSData(driverId){
    const lat = (Math.random() * 180 - 90).toFixed(6)
    const lon = (Math.random() * 360 - 180).toFixed(6)
    const speed = (Math.random() * 160)
    return {
        DriverId :driverId,
        lat,
        lon,
        ts : Date.now(),
        speed
    }
}
async function run(){
    await producer.connect()
    console.log('Simulator Connected to Kafka')

    setInterval(async ()=>{
        for (const driver of drivers){
            const data = generateRandomGPSData(driver)
            await producer.send({
                topic : 'gps-data',
                messages : [{value : JSON.stringify(data)}]
            })
            console.log('Sent Data ', data)
        }
    } , 3000)
}

run().catch(console.error)