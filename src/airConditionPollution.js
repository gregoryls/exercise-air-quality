import "./style.css";

// TODO
// feet2 to m2 conversion

function solarDeclinationAngle(day) {
  // takes numerical day starting from Jan 1 = 1. returns angle in degrees.
  return 23.45 * Math.sin((2 * Math.PI * (284 + day)) / 365);
}
console.log(solarDeclinationAngle(81));

function sunHourAngle(localTime, localLongitude, standardMeridian) {
  // solar time in decimal hours, e.g. 1:30PM = 13.5 hours
  // longitudes in degrees to calculate offset from the timezone standard
  return 15 * (localTime + (standardMeridian - localLongitude) / 15 - 12);
}
