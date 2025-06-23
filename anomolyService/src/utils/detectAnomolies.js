const detectAnomolies = (gpsData) =>{
    if(!gpsData || !gpsData.lat || !gpsData.lon || !gpsData.ts || !gpsData.speed == null )  return null;

    // Assuming speeding is an anomoly
    const {speed} = gpsData
    if(speed > 120){
        return {
            ...gpsData,
            anomolyType : 'Speeding',
            detectedAt : Date.now(),
            speed : speed.toFixed(2) // Speed in km/h 
        }
    }
    return null
}

export default detectAnomolies