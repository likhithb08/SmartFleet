import {Kafka} from 'kafkajs'
import dotenv from 'dotenv'
import detectAnomolies from '../utils/detectAnomolies.js'
import sendAnomoly from '../kafka/producer.js'
import Anomoly from '../models/Anomoly.js'

dotenv.config()

const kafka = new Kafka({
    clientId : 'anomoly-Detector',
    brokers : [process.env.KAFKA_BROKER || 'localhost:9092']
})

const consumer = kafka.consumer({groupId : 'anomoly-Detector'})

const runConsumer = async () =>{
    await consumer.connect()
    await consumer.subscribe({topic : 'gps-data' , fromBeginning : true})

    await consumer.run({
        eachMessage : async ({topic , partition, message}) => {
            if(!message || !message.value){
                console.error('invalid kafka message')
                return
            }
            const parsedData = JSON.parse(message.value.toString())
            if(!parsedData || !parsedData.lat || !parsedData.DriverId || !parsedData.lon){
                console.errror('Malformed  data' , parsedData)
                return 
            }
            const gpsData = {
                driverId : parsedData.DriverId,
                lat : parsedData.lat,
                lon : parsedData.lon,
                ts : parsedData.lon,
                speed : parsedData.speed
            }
            console.log('Reciebed GPS Data ' , gpsData)

            const anomoly = detectAnomolies(gpsData)
            if(!anomoly){{
                console.log('No anomoly deteced ')
                return
            }}
            const normalizedAnomoly = {
                driverId : anomoly.driverId,
                lat : anomoly.lat,
                lon : anomoly.lon,
                ts : new Date(parseInt(anomoly.ts)),
                anomolyType : anomoly.anomolyType,
                detectedAt : new Date(anomoly.detectedAt),
                speed : anomoly.speed
            }

            if(anomoly){
                console.log('Anomoly detected', anomoly)
                await Anomoly.create(normalizedAnomoly)
                await sendAnomoly(normalizedAnomoly)
            }
        }
    })
}

export default runConsumer