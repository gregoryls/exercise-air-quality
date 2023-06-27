import "./style.css";
import Plotly from "plotly.js-dist-min";
import * as utils from "./math";
import * as dom from "./DOM";

// console.log(utils.PM25ConcentrationFromAQI(401));
// console.log(utils.calculateMinuteVentilationFromHeartRate(60));

// warning sign about how hours calculated, exercise + resting added give example of 23 + 1 for 24
// see if importing to dom could steamline some pieces
// consider 1 day air pollution effects on hospitalization
// consider plots for large masses as well
// large masses on inset plots
// fix modal overflow problem
// check rel. risks on exercise greater than 24 hours.
// reorder info modal

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  const form = document.getElementById("inputForm");
  if (form.checkValidity()) {
    const PM25MassBreathed = utils.calculateUserPM25Mass();
    const PM25MassBreathed24Hour = utils.calculateUserPM25Mass(true);
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
      utils.calculateRelativeRiskLungCancerMortality(
        PM25MassBreathed24Hour / 1000,
        true
      )
    );
    dom.insertCVDMortality(
      utils.calculateRelativeRiskCVDMortality(
        PM25MassBreathed24Hour / 1000,
        true
      )
    );
  }
});
console.log(utils.calculateRelativeRiskCVDMortality(60));

const plotMass = [];
let mass = 0;
for (let i = 0; i < 1201; i += 1) {
  plotMass.push(mass);
  mass += 0.01;
}
console.log(plotMass);

const largePlotMass = [];
let largeMass = 0;
for (let i = 0; i < 1201; i += 1) {
  largePlotMass.push(largeMass);
  largeMass += 0.5;
}
console.log(largePlotMass);

const plotRelativeRiskCVD = [];
for (let i = 0; i < plotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskCVDMortality(plotMass[i], false);
  plotRelativeRiskCVD.push(risk);
}
// console.log(plotRelativeRiskCVD);

const plotRelativeRiskLungCancer = [];
for (let i = 0; i < plotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskLungCancerMortality(
    plotMass[i],
    false
  );
  plotRelativeRiskLungCancer.push(risk);
}

const dataCVD = [
  {
    x: plotMass,
    y: plotRelativeRiskCVD,
    mode: "lines",
    name: "spline",
    line: { shape: "spline", color: "rgb(217, 14, 0)" },
  },
];

Plotly.newPlot(
  "testPlot",
  dataCVD,
  // layout
  {
    // width: 400,
    // height: 400,

    paper_bgcolor: "#00000000",
    plot_bgcolor: "#c1f0c1",
    font: { color: "black" },

    title: "Relative Risk CVD Mortality",
    xaxis: {
      title: "Chronic Daily Exposure of PM2.5 mass (mg)",
      gridcolor: "black",
    },
    yaxis: { title: "Relative Risk", gridcolor: "black" },
    hovermode: "closest",
    hoverdistance: -1,
  },

  // config
  { responsive: true }
);

Plotly.newPlot(
  "testPlot2",

  // data
  [
    {
      x: plotMass,
      y: plotRelativeRiskLungCancer,
      mode: "lines",
      name: "spline",
      line: { shape: "spline", color: "rgb(217, 14, 0)" },
    },
  ],

  // layout
  {
    paper_bgcolor: "#00000000",
    plot_bgcolor: "#c1f0c1",
    font: { color: "black" },

    title: "Relative Risk Lung Cancer Mortality",
    xaxis: {
      title: "Chronic Daily Exposure of PM2.5 mass (mg)",
      gridcolor: "black",
    },
    yaxis: { title: "Relative Risk", gridcolor: "black" },
  },

  // config
  { responsive: true }
);

const infoModalButton = document.getElementById("infoModalButton");
const infoModal = document.getElementById("modal");
const overlay = document.querySelector(".overlay");

infoModalButton.addEventListener("click", () => {
  dom.removeClass(infoModal, "hidden");
  dom.removeClass(overlay, "hidden");
});

overlay.addEventListener("click", () => {
  dom.addClass(infoModal, "hidden");
  dom.addClass(overlay, "hidden");
});
