import "./style.css";

// TODO
// feet2 to m2 conversion

function degreeToRadian(degree) {
  return degree * (Math.PI / 180);
}

function radianToDegree(radian) {
  return radian * (180 / Math.PI);
}

function solarDeclinationAngle(day) {
  // takes numerical day starting from Jan 1 = 1. returns angle in degrees.
  return 23.45 * Math.sin((2 * Math.PI * (284 + day)) / 365);
}

function equationOfTime(day, year) {
  // numerical day starting from Jan 1 = 1. numerical current year (or target year)
  const D =
    6.24004077 + ((2 * Math.PI) / 365.25) * (365.25 * (year - 2000) + day);
  const minuteOffset = -7.659 * Math.sin(D) + 9.863 * Math.sin(2 * D + 3.5932);
  return minuteOffset;
}

function sunHourAngle(localTime, localLongitude, standardMeridian) {
  // slc = -111.84, standard = -105
  // solar time in decimal hours, e.g. 1:30PM = 13.5 hours
  // longitudes in degrees to calculate offset from the timezone standard
  // returns angle in degrees
  return 15 * (localTime + (standardMeridian - localLongitude) / 15 - 12);
}
