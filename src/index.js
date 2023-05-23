import "./style.css";
import * as utils from "./math";

console.log(utils.PM25ConcentrationFromAQI(401));
console.log(utils.calculateMinuteVentilationFromHeartRate(60));

// NOTE - make page as checkbox calculator, did you do a workout? how long? --> adds to total count for a 24 hour period
// TODO look up more about indoor vs outdoor smoking
// TODO Arden Pope bibliography
// TODO put warning on 500 AQI cap for reliable conversions
// TODO look up cpa air pollution guidelines for source material

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  console.log(utils.getUserRestingHeartRate());
  console.log(utils.getUserAQI());
  console.log(utils.PM25ConcentrationFromAQI(100));
  console.log(utils.calculateUserPM25Mass(1440) / 12000);
});
