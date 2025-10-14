import "./style.css";

// TODO
// feet2 to m2 conversion

function solarDeclinationAngle(day) {
  // takes numerical day starting from Jan 1 = 1. returns angle in degrees.
  return 23.45 * Math.sin((2 * Math.PI * (284 + day)) / 365);
}
console.log(solarDeclinationAngle(81));
