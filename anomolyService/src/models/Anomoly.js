import mongoose from 'mongoose'

const anomolySchema = new mongoose.Schema({
    driverId : {
        type : String,
        required : true
    },
    lat : {
        type : Number,
        required : true
    },
    lon : {
        type : Number,
        required : true
    },
    ts : {
        type : Date,
        required : true 
    },
    anomolyType : {
        type : String,
        required : true
    },
    detectedAt : {
        type : Date,
        default : Date.now
    },
    speed : Number
})

const Anomoly = mongoose.model('Anomoly' , anomolySchema)

export default Anomoly