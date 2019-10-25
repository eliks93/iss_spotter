const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip
  return request(`https://ipvigilante.com/${ip}`)
};

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${data.latitude}&lon=${data.longitude}`)
}


const printPassTimes = function(passTimes) {
  const array = JSON.parse(passTimes).response
  for (const pass of array) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPassTimes)
  .catch(error => {
    console.log('big no no bro', error.message)
  }) 
}
module.exports = { nextISSTimesForMyLocation };