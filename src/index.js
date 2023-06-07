import "./style.css";
import * as utils from "./math";
import * as dom from "./DOM";

// console.log(utils.PM25ConcentrationFromAQI(401));
// console.log(utils.calculateMinuteVentilationFromHeartRate(60));

// NOTE - make page as checkbox calculator, did you do a workout? how long? --> adds to total count for a 24 hour period
// TODO look up more about indoor vs outdoor smoking
// TODO Arden Pope bibliography
// TODO put warning on 500 AQI cap for reliable conversions
// TODO look up epa air pollution guidelines for source material
// TODO html for presenting info
// TODO hide output html until calculated
// warning sign about how hours calculated, exercise + resting added give example of 23 + 1 for 24
// see if importing to dom could steamline some pieces
// investigate blank exercise heart rate bug

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  // console.log(utils.getUserExerciseDuration());
  // console.log(utils.getUserAQI());
  // console.log(utils.PM25ConcentrationFromAQI(100));
  // console.log(utils.calculateUserPM25Mass());
  // console.log(
  //   utils.convertToCigarettePercentage(utils.calculateUserPM25Mass())
  // );
  dom.insertUserPM25Breathed(utils.calculateUserPM25Mass());
  dom.insertUserCigarettePercentage(
    utils.convertToCigarettePercentage(utils.calculateUserPM25Mass())
  );
  dom.insertLungCancerMortality(
    utils.calculateRelativeRiskLungCancerMortality(
      utils.calculatePM25MassBreathed()
    )
  );
});
console.log(utils.calculateRelativeRiskCVDMortality(60));
