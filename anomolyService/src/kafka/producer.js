import {Kafka} from 'kafkajs'
import dotenv from 'dotenv'

dotenv.config()

const kafka = new Kafka({
    clientID : 'anomoly-producer',
    brokers : [process.env.KAFKA_BROKER || 'localhost:9092'] 
})

let producer

const connectProducer= async()=>{
    if(!producer){
        producer = kafka.producer()
        producer.connect()
    }
}

const sendAnomoly = async (anomoly) =>{
    try{
        await connectProducer()
        await producer.send({
            topic : 'anomoly-data',
            messages : [{value : JSON.stringify(anomoly)}]
        })
        console.log('Anomoly Sent Succesfully',anomoly)
    }catch (error){
        console.error('Error Sending Anomoly',error)
    }
}

export default sendAnomoly