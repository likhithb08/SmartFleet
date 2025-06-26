// src/tests/anomolyDetection.test.js
import detectAnomolies from '../utils/detectAnomolies.js';

describe('Anomaly Detection Logic', () => {
  const baseGPS = {
    driverId: 'D1',
    lat: 12.9716,
    lon: 77.5946,
    ts: new Date(),
    speed: 130
  }

  it('should detect a speeding anomaly when speed > 120', () => {
    const result = detectAnomolies(baseGPS)
    expect(result).not.toBeNull()
    expect(result.anomolyType).toBe('Speeding')
    expect(result.detectedAt).toBeDefined()
    expect(result.speed).toBe("130.00")
  })

  it('should return null for normal speed', () => {
    const normalSpeed = { ...baseGPS, speed: 90 }
    const result = detectAnomolies(normalSpeed)
    expect(result).toBeNull()
  })

  it('should return null for invalid input (missing lat)', () => {
    const invalidData = { ...baseGPS }
    delete invalidData.lat
    const result = detectAnomolies(invalidData)
    expect(result).toBeNull()
  })

  it('should return null if input is null', () => {
    const result = detectAnomolies(null)
    expect(result).toBeNull()
  })
})
