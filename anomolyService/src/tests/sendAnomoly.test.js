import { jest } from '@jest/globals'

// Mock Kafka producer behavior
const mockSend = jest.fn()
const mockConnect = jest.fn()

// ✅ Correctly mock kafkajs in ESM
jest.unstable_mockModule('kafkajs', () => ({
  Kafka: jest.fn(() => ({
    producer: () => ({
      connect: mockConnect,
      send: mockSend
    })
  }))
}))

// ✅ Now dynamically import the file AFTER mocking
const { default: sendAnomoly } = await import('../kafka/producer.js')

describe('Kafka Producer Test - Send Anomoly', () => {
  const mockAnomoly = {
    driverId: 'D1',
    lat: 20.36,
    lon: 22.36,
    ts: new Date(),
    speed: 120,
    anomolyType: 'Speeding',
    detectedAt: new Date()
  }

  it('Should send Anomoly Message Successfully', async () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    await sendAnomoly(mockAnomoly)

    expect(mockSend).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalledWith('Anomoly Sent Succesfully', mockAnomoly)

    logSpy.mockRestore()
  })
})
