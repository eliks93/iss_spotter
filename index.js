

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('162.245.144.188', (error, data) => {
//   if(error) {
//     console.log("it didn't work!" , error);
//     return;
//   }
//   console.log(`It worked, Latitude: ${data.latitude}. Logitude: ${data.longitude}`);
// });

// fetchISSFlyOverTimes({latitude: '49.27670', longitude: '-123.13000' }, (error, location) => {
//   if(error) {
//     console.log("it didn't work!", error)
//     return
//   }
//   console.log(location)
// })


const { nextISSTimesForMyLocation } = require('./iss');

// nextISSTimesForMyLocation((passTimes, error) => {
//   if (error) {
//     return console.log("It didn't work!" , error);
//   }
//   // success, print out the deets!
//   console.log(passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((passTimes, error) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});