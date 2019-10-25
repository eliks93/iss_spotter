const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      const ip = data.ip
  
      callback(ip, error);
     
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://ipvigilante.com/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const loc = {};
      const data = JSON.parse(body);
      loc.latitude = data.data.latitude;
      loc.longitude = data.data.longitude;
      // console.log(data)
      callback(loc, error);
     
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  // console.log(coords)
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, message, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (message.statusCode !== 200) {
      const msg = `Status Code ${message.statusCode} when fetching spacestation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      // console.log(data)
      let passes = data.response;
      
      callback(passes, error);
     
    }
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((IP, error) => {
    fetchCoordsByIP(IP, (coords, error) => {
      fetchISSFlyOverTimes(coords, (passes, error) => {
        callback(passes, error)
      })
    })
  })

}

module.exports = { nextISSTimesForMyLocation };