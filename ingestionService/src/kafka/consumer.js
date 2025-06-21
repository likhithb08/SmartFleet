import { Kafka } from "kafkajs";
import dotenv from 'dotenv'
import connectDB from '../dataBase/mongo.js'
import GPSData from '../models/GPSData.js'

dotenv.config()

const kafka = new Kafka({
    clientID : 'gps-consumer',
    brokers : [process.env.KAFKA_BROKER || 'localhost:9092']
})

const consumer = kafka.consumer({groupId : 'gps-group'})

const runConsumer = async () =>{
    await connectDB()
    console.log('MongoDB connected succesfuly')

    await consumer.connect()
    console.log('Kafka consumer connected succesfully')

    await consumer.subscribe({topic : 'gps-data' , fromBeginning : true})

    await consumer.run({
        eachMessage : async ({topic, partition ,  message}) =>{
            const data = JSON.parse(message.value.toString())
            console.log('Message recieved : ', data)

            const gpsEntry =  new GPSData({
                DriverId  : data.DriverId,
                lat : parseFloat(data.lat),
                lon : parseFloat(data.lon),
                ts : new Date(data.ts)
            })
            await gpsEntry.save()
        }
    })
}

runConsumer().catch(console.error)
