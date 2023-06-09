import "./style.css";
import Plotly from "plotly.js-dist-min";
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
// consider 1 day air pollution effects on hospitalization
// add bool to lung cancer calc + make plot
// consider plots for large masses as well

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  const PM25MassBreathed = utils.calculateUserPM25Mass();
  // console.log(utils.getUserExerciseDuration());
  // console.log(utils.getUserAQI());
  // console.log(utils.PM25ConcentrationFromAQI(100));
  // console.log(utils.calculateUserPM25Mass());
  // console.log(
  //   utils.convertToCigarettePercentage(utils.calculateUserPM25Mass())
  // );
  dom.insertUserPM25Breathed(PM25MassBreathed);
  dom.insertUserCigarettePercentage(
    utils.convertToCigarettePercentage(PM25MassBreathed)
  );

  // relative risk mass divided by 1000 to get units rights; micrograms to required milligrams
  dom.insertLungCancerMortality(
    utils.calculateRelativeRiskLungCancerMortality(PM25MassBreathed / 1000)
  );
  dom.insertCVDMortality(
    utils.calculateRelativeRiskCVDMortality(PM25MassBreathed / 1000, true)
  );
});
console.log(utils.calculateRelativeRiskCVDMortality(60));

const plotMass = [];
let mass = 0;
for (let i = 0; i < 100; i += 1) {
  plotMass.push(mass);
  mass += 0.05;
}
console.log(plotMass);

const plotRelativeRiskCVD = [];
for (let i = 0; i < plotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskCVDMortality(plotMass[i], false);
  plotRelativeRiskCVD.push(risk);
}
console.log(plotRelativeRiskCVD);

Plotly.newPlot(
  "testPlot",
  [
    {
      x: plotMass,
      y: plotRelativeRiskCVD,
      mode: "lines",
      name: "spline",
      line: { shape: "spline" },
    },
  ],
  {
    // margin: { t: 0 },
    title: "Relative Risk CVD Mortality",
    xaxis: { title: "Chronic Daily Exposure of PM2.5 mass (mg)" },
    yaxis: { title: "Relative Risk" },
  }
);
