import { Kafka } from "kafkajs";
import dotenv from "dotenv"

dotenv.config()

const kafka = new Kafka({
    brokers : [process.env.KAFKA_BROKER]
})

const producer = kafka.producer()

async function run(){
    await producer.connect()

    const gpsData = {
        DriverId : 'D1',
        lat : '37.7749',
        lon : '-122.4194',
        ts : Date.now()
    }

    await producer.send({
        topic : 'gps-data',
        messages : [{value : JSON.stringify(gpsData)}]
    })
    console.log("GPS data sent to Kafka topic 'gps-data'")
    await producer.disconnect()

}

run().catch(console.error)