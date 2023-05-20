import "./style.css";
import * as utils from "./math";

console.log(utils.PM25ConcentrationFromAQI(401));
console.log(utils.calculateMinuteVolumeFromHeartRate(60));

// NOTE - make page as checkbox calculator, did you do a workout? how long? --> adds to total count for a 24 hour period
// TODO look up more about indoor vs outdoor smoking
// TODO Arden Pope bibliography
// TODO html template

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  console.log(utils.getUserHeartRate());
});
