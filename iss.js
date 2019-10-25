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
      
      callback(error, data.ip);
    }
  });
};

const fetchCoordsByIP = (IP, callback) => {
  request(`https://ipvigilante.com/json/${IP}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const loc = {};
      const data = JSON.parse(body);
      loc.latitude = data.data.latitude;
      loc.longitude = data.data.longitude;
      callback(error, loc);
     
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };