import  runConsumer  from '../src/kafka/consumer.js'
import connectDB from './database/mongo.js'


await connectDB()
runConsumer().catch(console.error)