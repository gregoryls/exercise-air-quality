import "./style.css";

// TODO
// feet2 to m2 conversion

function solarDeclinationAngle(day) {
  return Math.sin((2 * Math.PI * (284 + day)) / 365);
}
console.log(solarDeclinationAngle(10));
