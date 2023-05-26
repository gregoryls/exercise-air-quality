import "./style.css";
import * as utils from "./math";
import * as dom from "./DOM";

console.log(utils.PM25ConcentrationFromAQI(401));
console.log(utils.calculateMinuteVentilationFromHeartRate(60));

// NOTE - make page as checkbox calculator, did you do a workout? how long? --> adds to total count for a 24 hour period
// TODO look up more about indoor vs outdoor smoking
// TODO Arden Pope bibliography
// TODO put warning on 500 AQI cap for reliable conversions
// TODO look up cpa air pollution guidelines for source material
// TODO html for presenting info
// TODO hide output html until calculated

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  console.log(utils.getUserRestingHeartRate());
  console.log(utils.getUserAQI());
  console.log(utils.PM25ConcentrationFromAQI(100));
  console.log(utils.calculateUserPM25Mass(1440));
  console.log(
    utils.convertToCigarettePercentage(utils.calculateUserPM25Mass(1440))
  );
  dom.insertUserPM25Breathed(utils.calculateUserPM25Mass(1440));
  dom.insertUserCigarettePercentage(
    utils.convertToCigarettePercentage(utils.calculateUserPM25Mass(1440))
  );
});
