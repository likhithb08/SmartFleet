import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server';
import Anomoly from '../models/Anomoly'

let mongoServer

beforeAll(async()=>{
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri,{useNewUrlParser : true , useUnifiedTopology : true})
})

afterAll(async()=>{
    await mongoose.disconnect()
    await mongoServer.stop()
})

describe('Anomoly Model Test0', ()=>{
    it('Should have a valid anomoly' , async()=>{
        const validAnomoly =  new Anomoly({
            driverId : 'D1',
            lat : 12.34,
            lon : 56.78,
            ts : new Date(),
            anomolyType : 'speeding',
            speed : 120
        })
        const saved  = await validAnomoly.save()
        expect(saved._id).toBeDefined()
        expect(saved.driverId).toBe('D1')

    })
    it('Should fail withhout required fields' , async () =>{
        const invalidAnomoly = new Anomoly({
            lat : 23.00,
            lon : 36.00,
            speed : 110
        })
        let err 
        try{
            await invalidAnomoly.save() 
        }catch(error){
            err = error
        }
        expect(err).toBeDefined()
        expect(err.errors.driverId).toBeDefined()
        expect(err.errors.ts).toBeDefined()
        expect(err.errors.anomolyType).toBeDefined()
    })
} )