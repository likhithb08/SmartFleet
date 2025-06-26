import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import Anomoly from '../models/Anomoly.js'
import detectAnomolies from '../utils/detectAnomolies.js'

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('End-to-End Anomaly Detection Test', () => {
  it('Should detect an anomaly and insert into MongoDB', async () => {
    const gpsData = {
      driverId: 'D1',
      lat: 12.34,
      lon: 56.78,
      ts: new Date(),
      speed: 130
    }

    const anomoly = detectAnomolies(gpsData)

    expect(anomoly).not.toBeNull()

    const savedAnomoly = await Anomoly.create(anomoly)

    const found = await Anomoly.findOne({ driverId: 'D1' })

    expect(found).not.toBeNull()
    expect(found.anomolyType).toBe('Speeding')
    expect(found.speed).toBe(130)
  })
})
