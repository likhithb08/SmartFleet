function isValidGPSData(data){
      const {
    DriverId: rawDriverId,
    driverId: rawDriverIdLower,
    lat,
    lon,
    ts
  } = data;

  const driverId = rawDriverId || rawDriverIdLower

    if(!driverId || !lat || !lon || !ts){
        return {valid : false , message : 'Missing required Fields'}
    }

    if(typeof driverId !== 'string'){
        return {vaild : false , message : 'DriverId mus be a string'}
    }

    const latNum = parseFloat(lat)
    const lonNum = parseFloat(lon)
    
    if(isNaN(latNum) || isNaN(lonNum) ){
        return {valid :false , message : 'Lat and Lon must be numeric values'}
    }

    if(latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180){
        return {valid : false , message : 'Lat or Lon out of range'}
    }
    
    if(!Number.isInteger(ts) || Number(ts) < 0){
        return {valid : false , message : 'TimeStamp must be a positive Ineger'}
    }

    return {valid : true, message : 'valid GPSData'}
}

export default isValidGPSData