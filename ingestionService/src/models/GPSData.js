import mongoose from 'mongoose'

const gpsDataSchema = new mongoose.Schema({
    DriverId : {
        type : String,
        required : true
    },
    lat : {
        type : Number,
        required : true
    },
    lon : {
        type : Number,
        required :true
    },
    ts : {
        type : Date,
        default : Date.now
    }
},{
    timestamps :true
})

const GPSData = mongoose.model('GPSData', gpsDataSchema)

export default GPSData