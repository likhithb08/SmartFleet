import mongoose from 'mongoose'

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smart-fleet',{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    console.log(`MongoDB connected :${conn.connection.host}`)
    }catch(error){
        console.error(`MongoDB connection error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDB