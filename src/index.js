import "./style.css";
import Plotly from "plotly.js-dist-min";
import * as utils from "./math";
import * as dom from "./DOM";

// see if importing to dom could steamline some pieces
// cleanup
// organize index event listener code better

const instructionsButton = document.getElementById(
  "calculatorInstructionsButton"
);
instructionsButton.addEventListener("click", () => {
  dom.toggleHidden(
    "calculatorInstructions",
    "calculatorInstructionsButton",
    "Show Instructions",
    "Hide Instructions",
    true
  );
});

const notesButton = document.getElementById("notesButton");
notesButton.addEventListener("click", () => {
  dom.toggleHidden("notes", "notesButton", "Show Notes", "Hide Notes", true);
});

const submitButton = document.getElementById("submitData");
submitButton.addEventListener("click", () => {
  const form = document.getElementById("inputForm");
  if (form.checkValidity()) {
    const PM25MassBreathed = utils.calculateUserPM25Mass();
    const PM25MassBreathed24Hour = utils.calculateUserPM25Mass(true);
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
// console.log(utils.calculateRelativeRiskCVDMortality(60));

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
// console.log(largePlotMass);

const plotRelativeRiskCVD = [];
for (let i = 0; i < plotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskCVDMortality(plotMass[i], false);
  plotRelativeRiskCVD.push(risk);
}

const plotRelativeRiskCVDLargeMass = [];
for (let i = 0; i < largePlotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskCVDMortality(largePlotMass[i], false);
  plotRelativeRiskCVDLargeMass.push(risk);
  // console.log(risk);
}

const plotRelativeRiskLungCancer = [];
for (let i = 0; i < plotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskLungCancerMortality(
    plotMass[i],
    false
  );
  plotRelativeRiskLungCancer.push(risk);
}

const plotRelativeRiskLungCancerLargeMass = [];
for (let i = 0; i < largePlotMass.length; i += 1) {
  const risk = utils.calculateRelativeRiskLungCancerMortality(
    largePlotMass[i],
    false
  );
  plotRelativeRiskLungCancerLargeMass.push(risk);
}

const dataCVD = {
  x: plotMass,
  y: plotRelativeRiskCVD,
  mode: "lines",
  name: "spline",
  line: { shape: "spline", color: "rgb(217, 14, 0)" },
};

const dataCVDLargeMass = {
  x: largePlotMass,
  y: plotRelativeRiskCVDLargeMass,
  xaxis: "x2",
  yaxis: "y2",
  mode: "lines",
  name: "spline",
  line: { shape: "spline", color: "rgb(217, 14, 0)" },
};

const layoutCVD = {
  paper_bgcolor: "#00000000",
  plot_bgcolor: "#e4e2e6",
  font: { color: "black" },
  title: "Relative Risk CVD Mortality",

  xaxis: {
    title: "Chronic Daily Exposure of PM2.5 mass (mg)",
  },
  yaxis: {
    title: "Relative Risk",
  },
  xaxis2: {
    domain: [0.57, 0.97],
    anchor: "y2",
  },
  yaxis2: {
    domain: [0.3, 0.7],
    anchor: "x2",
  },
  showlegend: false,
};

const dataCVDCombined = [dataCVD, dataCVDLargeMass];

const configGeneric = { responsive: true };

const dataLungCancer = {
  x: plotMass,
  y: plotRelativeRiskLungCancer,
  mode: "lines",
  line: { shape: "spline", color: "rgb(217, 14, 0)" },
};
const dataLungCancerLargeMass = {
  x: largePlotMass,
  y: plotRelativeRiskLungCancerLargeMass,
  xaxis: "x2",
  yaxis: "y2",
  mode: "lines",
  line: { shape: "spline", color: "rgb(217, 14, 0)" },
};

const dataLungCancerCombined = [dataLungCancer, dataLungCancerLargeMass];
const layoutLungCancer = {
  paper_bgcolor: "#00000000",
  plot_bgcolor: "#e4e2e6",
  font: { color: "black" },

  title: "Relative Risk Lung Cancer Mortality",
  xaxis: {
    title: "Chronic Daily Exposure of PM2.5 mass (mg)",
  },
  yaxis: { title: "Relative Risk" },
  xaxis2: {
    domain: [0.57, 0.97],
    anchor: "y2",
  },
  yaxis2: {
    domain: [0.15, 0.55],
    anchor: "x2",
  },
  showlegend: false,
};

Plotly.newPlot("CVDPlot", dataCVDCombined, layoutCVD, configGeneric);
Plotly.newPlot(
  "lungCancerPlot",
  dataLungCancerCombined,
  layoutLungCancer,
  configGeneric
);

// const infoModal = document.getElementById("modal");
// const overlay = document.querySelector(".overlay");

// overlay.addEventListener("click", () => {
//   dom.addClass(infoModal, "hidden");
//   dom.addClass(overlay, "hidden");
// });
