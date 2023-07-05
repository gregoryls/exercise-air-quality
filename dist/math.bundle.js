/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PM25ConcentrationFromAQI": () => (/* binding */ PM25ConcentrationFromAQI),
/* harmony export */   "calculateMinuteVentilationFromHeartRate": () => (/* binding */ calculateMinuteVentilationFromHeartRate),
/* harmony export */   "calculatePM25MassBreathed": () => (/* binding */ calculatePM25MassBreathed),
/* harmony export */   "calculateRelativeRiskCVDMortality": () => (/* binding */ calculateRelativeRiskCVDMortality),
/* harmony export */   "calculateRelativeRiskLungCancerMortality": () => (/* binding */ calculateRelativeRiskLungCancerMortality),
/* harmony export */   "calculateTotalExposureTime": () => (/* binding */ calculateTotalExposureTime),
/* harmony export */   "calculateUserPM25Mass": () => (/* binding */ calculateUserPM25Mass),
/* harmony export */   "calculateVolumeAirBreathed": () => (/* binding */ calculateVolumeAirBreathed),
/* harmony export */   "convertToCigarettePercentage": () => (/* binding */ convertToCigarettePercentage),
/* harmony export */   "getUserAQI": () => (/* binding */ getUserAQI),
/* harmony export */   "getUserExerciseDuration": () => (/* binding */ getUserExerciseDuration),
/* harmony export */   "getUserExerciseHeartRate": () => (/* binding */ getUserExerciseHeartRate),
/* harmony export */   "getUserRestingDuration": () => (/* binding */ getUserRestingDuration),
/* harmony export */   "getUserRestingHeartRate": () => (/* binding */ getUserRestingHeartRate)
/* harmony export */ });
// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
// Ve = Minute Ventilation, the amount of air breathed usually Liters/minute

function calculateMinuteVentilationFromHeartRate(heartRate) {
  // return 0 by force to avoid issues with exp(0) = 1 giving a small minute ventilation from heart rate of zero
  if (heartRate === 0) return 0;

  // boolean for user selection of 'Female?' checkbox
  const checkFemale = document.getElementById("female").checked;
  const minuteVentilation = Math.exp(1.162 + 0.021 * heartRate);

  // convert standard Liters/minute units to m^3/minute to match with standard pm2.5 concentration units
  const minuteVentilationM3 = minuteVentilation / 1000;

  // women have lungs 75% the size of men - apply correction factor
  if (checkFemale) return minuteVentilationM3 * 0.75;
  return minuteVentilationM3;
}

function PM25ConcentrationFromAQI(AQI) {
  let Ih;
  let Il;
  let BPh;
  let BPl;

  if (AQI >= 0) {
    Ih = 50;
    Il = 0;
    BPh = 12;
    BPl = 0;
  }
  if (AQI >= 51) {
    Ih = 100;
    Il = 51;
    BPh = 35.4;
    BPl = 12.1;
  }
  if (AQI >= 101) {
    Ih = 150;
    Il = 101;
    BPh = 55.4;
    BPl = 35.5;
  }
  if (AQI >= 151) {
    Ih = 200;
    Il = 151;
    BPh = 150.4;
    BPl = 55.5;
  }
  if (AQI >= 201) {
    Ih = 300;
    Il = 201;
    BPh = 250.4;
    BPl = 150.5;
  }
  if (AQI >= 301) {
    Ih = 400;
    Il = 301;
    BPh = 350.4;
    BPl = 250.5;
  }
  if (AQI >= 401) {
    Ih = 500;
    Il = 401;
    BPh = 500.4;
    BPl = 350.5;
  }

  return (
    (AQI + ((Ih - Il) / (BPh - BPl)) * BPl - Il) / ((Ih - Il) / (BPh - BPl))
  );
}

function calculateRelativeRiskLungCancerMortality(mass, rounding) {
  // this function expects mass input with units of milligrams(mg)
  const risk = 1 + 0.3195 * mass ** 0.7433;
  if (!rounding) return risk;
  const riskRounded = risk.toFixed(2);
  return riskRounded;
}

function calculateRelativeRiskCVDMortality(mass, rounding) {
  // this function expects mass input with units of milligrams(mg)
  // this covers ischemic heart disease(IHD), cardiavascular disease(CVD), and cardiopulmonary disease(CPD)
  const risk = 1 + 0.2685 * mass ** 0.273;
  if (!rounding) return risk;
  const riskRounded = risk.toFixed(2);
  return riskRounded;
}

function calculateVolumeAirBreathed(minuteVentilation, minutes) {
  // units in m^3, based on minute ventilation function
  const volume = minuteVentilation * minutes;
  return volume;
}

function calculatePM25MassBreathed(concentration, volume) {
  const PM25Mass = concentration * volume;
  return Number(PM25Mass);
}

function getUserAQI() {
  const userAQI = document.getElementById("userAQI");
  return Number(userAQI.value);
}

// Resting Inputs//
function getUserRestingHeartRate() {
  const userHeartRate = document.getElementById("userHeartRate");
  return Number(userHeartRate.value);
}

function getUserRestingDuration() {
  let duration = document.getElementById("userRestingDuration");
  // convert input from hours to minutes
  duration = Number(duration.value * 60);
  return duration;
}
// //

// Exercise Inputs//
function getUserExerciseHeartRate() {
  const exerciseHeartRate = document.getElementById("userExerciseHeartRate");
  return Number(exerciseHeartRate.value);
}

function getUserExerciseDuration() {
  const duration = document.getElementById("userExerciseDuration");
  return Number(duration.value);
}
// //

function calculateTotalExposureTime() {
  const restTime = getUserRestingDuration();
  const exerciseTime = getUserExerciseDuration();
  const totalTime = restTime + exerciseTime;

  return totalTime;
}

function calculateUserPM25Mass(day) {
  // day arg takes boolean to switch between raw user input and forced 24hr time period
  // final unit is in micrograms
  const PM25Concentration = PM25ConcentrationFromAQI(getUserAQI());
  let userRestingDuration = getUserRestingDuration();
  let userExerciseDuration = getUserExerciseDuration();

  if (day) {
    if (userExerciseDuration > 1440) userExerciseDuration = 1440;
    userRestingDuration = 1440 - userExerciseDuration;
  }

  // console.log(userExerciseDuration);
  // console.log(userRestingDuration);

  // Resting Mass //
  const userRestingMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserRestingHeartRate()
  );
  const userRestingVolumeBreathed = calculateVolumeAirBreathed(
    userRestingMinuteVolume,
    userRestingDuration
  );
  const userRestingPM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userRestingVolumeBreathed
  );
  // //

  // Exercise Mass //
  const userExerciseMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserExerciseHeartRate()
  );
  const userExerciseVolumeBreathed = calculateVolumeAirBreathed(
    userExerciseMinuteVolume,
    userExerciseDuration
  );
  const userExercisePM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userExerciseVolumeBreathed
  );
  // //

  // round result to nearest integer
  const userRestingPM25MassRounded = Math.round(userRestingPM25Mass);
  const userExercisePM25MassRounded = Math.round(userExercisePM25Mass);
  const totalPM25Mass =
    userRestingPM25MassRounded + userExercisePM25MassRounded;
  return totalPM25Mass;
}

function convertToCigarettePercentage(pm25) {
  // pm25 comes in as micrograms, a common cigarette has 12,000 micrograms of PM2.5
  // mulitply but 100 for percentage of a cigarette breathed for the given PM2.5 mass
  const cigarettePercent = (pm25 / 12000) * 100;

  // round result to two decimal places
  const cigarettePercentRounded = Number(cigarettePercent.toFixed(2));
  return cigarettePercentRounded;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS8uL3NyYy9tYXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQVFJID0gQWlyIFF1YWxpdHkgSW5kZXhcclxuLy8gUE0yLjUgPSBQYXJ0aWN1bGF0ZSBNYXR0ZXIgMi41IG1pY3JvbWV0ZXIgcGFydGljbGVzXHJcbi8vIFZlID0gTWludXRlIFZlbnRpbGF0aW9uLCB0aGUgYW1vdW50IG9mIGFpciBicmVhdGhlZCB1c3VhbGx5IExpdGVycy9taW51dGVcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoaGVhcnRSYXRlKSB7XHJcbiAgLy8gcmV0dXJuIDAgYnkgZm9yY2UgdG8gYXZvaWQgaXNzdWVzIHdpdGggZXhwKDApID0gMSBnaXZpbmcgYSBzbWFsbCBtaW51dGUgdmVudGlsYXRpb24gZnJvbSBoZWFydCByYXRlIG9mIHplcm9cclxuICBpZiAoaGVhcnRSYXRlID09PSAwKSByZXR1cm4gMDtcclxuXHJcbiAgLy8gYm9vbGVhbiBmb3IgdXNlciBzZWxlY3Rpb24gb2YgJ0ZlbWFsZT8nIGNoZWNrYm94XHJcbiAgY29uc3QgY2hlY2tGZW1hbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZlbWFsZVwiKS5jaGVja2VkO1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uID0gTWF0aC5leHAoMS4xNjIgKyAwLjAyMSAqIGhlYXJ0UmF0ZSk7XHJcblxyXG4gIC8vIGNvbnZlcnQgc3RhbmRhcmQgTGl0ZXJzL21pbnV0ZSB1bml0cyB0byBtXjMvbWludXRlIHRvIG1hdGNoIHdpdGggc3RhbmRhcmQgcG0yLjUgY29uY2VudHJhdGlvbiB1bml0c1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uTTMgPSBtaW51dGVWZW50aWxhdGlvbiAvIDEwMDA7XHJcblxyXG4gIC8vIHdvbWVuIGhhdmUgbHVuZ3MgNzUlIHRoZSBzaXplIG9mIG1lbiAtIGFwcGx5IGNvcnJlY3Rpb24gZmFjdG9yXHJcbiAgaWYgKGNoZWNrRmVtYWxlKSByZXR1cm4gbWludXRlVmVudGlsYXRpb25NMyAqIDAuNzU7XHJcbiAgcmV0dXJuIG1pbnV0ZVZlbnRpbGF0aW9uTTM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoQVFJKSB7XHJcbiAgbGV0IEloO1xyXG4gIGxldCBJbDtcclxuICBsZXQgQlBoO1xyXG4gIGxldCBCUGw7XHJcblxyXG4gIGlmIChBUUkgPj0gMCkge1xyXG4gICAgSWggPSA1MDtcclxuICAgIElsID0gMDtcclxuICAgIEJQaCA9IDEyO1xyXG4gICAgQlBsID0gMDtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA1MSkge1xyXG4gICAgSWggPSAxMDA7XHJcbiAgICBJbCA9IDUxO1xyXG4gICAgQlBoID0gMzUuNDtcclxuICAgIEJQbCA9IDEyLjE7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTAxKSB7XHJcbiAgICBJaCA9IDE1MDtcclxuICAgIElsID0gMTAxO1xyXG4gICAgQlBoID0gNTUuNDtcclxuICAgIEJQbCA9IDM1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTUxKSB7XHJcbiAgICBJaCA9IDIwMDtcclxuICAgIElsID0gMTUxO1xyXG4gICAgQlBoID0gMTUwLjQ7XHJcbiAgICBCUGwgPSA1NS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDIwMSkge1xyXG4gICAgSWggPSAzMDA7XHJcbiAgICBJbCA9IDIwMTtcclxuICAgIEJQaCA9IDI1MC40O1xyXG4gICAgQlBsID0gMTUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMzAxKSB7XHJcbiAgICBJaCA9IDQwMDtcclxuICAgIElsID0gMzAxO1xyXG4gICAgQlBoID0gMzUwLjQ7XHJcbiAgICBCUGwgPSAyNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA0MDEpIHtcclxuICAgIEloID0gNTAwO1xyXG4gICAgSWwgPSA0MDE7XHJcbiAgICBCUGggPSA1MDAuNDtcclxuICAgIEJQbCA9IDM1MC41O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIChBUUkgKyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpICogQlBsIC0gSWwpIC8gKChJaCAtIElsKSAvIChCUGggLSBCUGwpKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVSZWxhdGl2ZVJpc2tMdW5nQ2FuY2VyTW9ydGFsaXR5KG1hc3MsIHJvdW5kaW5nKSB7XHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBleHBlY3RzIG1hc3MgaW5wdXQgd2l0aCB1bml0cyBvZiBtaWxsaWdyYW1zKG1nKVxyXG4gIGNvbnN0IHJpc2sgPSAxICsgMC4zMTk1ICogbWFzcyAqKiAwLjc0MzM7XHJcbiAgaWYgKCFyb3VuZGluZykgcmV0dXJuIHJpc2s7XHJcbiAgY29uc3Qgcmlza1JvdW5kZWQgPSByaXNrLnRvRml4ZWQoMik7XHJcbiAgcmV0dXJuIHJpc2tSb3VuZGVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUmVsYXRpdmVSaXNrQ1ZETW9ydGFsaXR5KG1hc3MsIHJvdW5kaW5nKSB7XHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBleHBlY3RzIG1hc3MgaW5wdXQgd2l0aCB1bml0cyBvZiBtaWxsaWdyYW1zKG1nKVxyXG4gIC8vIHRoaXMgY292ZXJzIGlzY2hlbWljIGhlYXJ0IGRpc2Vhc2UoSUhEKSwgY2FyZGlhdmFzY3VsYXIgZGlzZWFzZShDVkQpLCBhbmQgY2FyZGlvcHVsbW9uYXJ5IGRpc2Vhc2UoQ1BEKVxyXG4gIGNvbnN0IHJpc2sgPSAxICsgMC4yNjg1ICogbWFzcyAqKiAwLjI3MztcclxuICBpZiAoIXJvdW5kaW5nKSByZXR1cm4gcmlzaztcclxuICBjb25zdCByaXNrUm91bmRlZCA9IHJpc2sudG9GaXhlZCgyKTtcclxuICByZXR1cm4gcmlza1JvdW5kZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChtaW51dGVWZW50aWxhdGlvbiwgbWludXRlcykge1xyXG4gIC8vIHVuaXRzIGluIG1eMywgYmFzZWQgb24gbWludXRlIHZlbnRpbGF0aW9uIGZ1bmN0aW9uXHJcbiAgY29uc3Qgdm9sdW1lID0gbWludXRlVmVudGlsYXRpb24gKiBtaW51dGVzO1xyXG4gIHJldHVybiB2b2x1bWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKGNvbmNlbnRyYXRpb24sIHZvbHVtZSkge1xyXG4gIGNvbnN0IFBNMjVNYXNzID0gY29uY2VudHJhdGlvbiAqIHZvbHVtZTtcclxuICByZXR1cm4gTnVtYmVyKFBNMjVNYXNzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJBUUkoKSB7XHJcbiAgY29uc3QgdXNlckFRSSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckFRSVwiKTtcclxuICByZXR1cm4gTnVtYmVyKHVzZXJBUUkudmFsdWUpO1xyXG59XHJcblxyXG4vLyBSZXN0aW5nIElucHV0cy8vXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyUmVzdGluZ0hlYXJ0UmF0ZSgpIHtcclxuICBjb25zdCB1c2VySGVhcnRSYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VySGVhcnRSYXRlXCIpO1xyXG4gIHJldHVybiBOdW1iZXIodXNlckhlYXJ0UmF0ZS52YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyUmVzdGluZ0R1cmF0aW9uKCkge1xyXG4gIGxldCBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclJlc3RpbmdEdXJhdGlvblwiKTtcclxuICAvLyBjb252ZXJ0IGlucHV0IGZyb20gaG91cnMgdG8gbWludXRlc1xyXG4gIGR1cmF0aW9uID0gTnVtYmVyKGR1cmF0aW9uLnZhbHVlICogNjApO1xyXG4gIHJldHVybiBkdXJhdGlvbjtcclxufVxyXG4vLyAvL1xyXG5cclxuLy8gRXhlcmNpc2UgSW5wdXRzLy9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJFeGVyY2lzZUhlYXJ0UmF0ZSgpIHtcclxuICBjb25zdCBleGVyY2lzZUhlYXJ0UmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckV4ZXJjaXNlSGVhcnRSYXRlXCIpO1xyXG4gIHJldHVybiBOdW1iZXIoZXhlcmNpc2VIZWFydFJhdGUudmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckV4ZXJjaXNlRHVyYXRpb24oKSB7XHJcbiAgY29uc3QgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJFeGVyY2lzZUR1cmF0aW9uXCIpO1xyXG4gIHJldHVybiBOdW1iZXIoZHVyYXRpb24udmFsdWUpO1xyXG59XHJcbi8vIC8vXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVG90YWxFeHBvc3VyZVRpbWUoKSB7XHJcbiAgY29uc3QgcmVzdFRpbWUgPSBnZXRVc2VyUmVzdGluZ0R1cmF0aW9uKCk7XHJcbiAgY29uc3QgZXhlcmNpc2VUaW1lID0gZ2V0VXNlckV4ZXJjaXNlRHVyYXRpb24oKTtcclxuICBjb25zdCB0b3RhbFRpbWUgPSByZXN0VGltZSArIGV4ZXJjaXNlVGltZTtcclxuXHJcbiAgcmV0dXJuIHRvdGFsVGltZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVVzZXJQTTI1TWFzcyhkYXkpIHtcclxuICAvLyBkYXkgYXJnIHRha2VzIGJvb2xlYW4gdG8gc3dpdGNoIGJldHdlZW4gcmF3IHVzZXIgaW5wdXQgYW5kIGZvcmNlZCAyNGhyIHRpbWUgcGVyaW9kXHJcbiAgLy8gZmluYWwgdW5pdCBpcyBpbiBtaWNyb2dyYW1zXHJcbiAgY29uc3QgUE0yNUNvbmNlbnRyYXRpb24gPSBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoZ2V0VXNlckFRSSgpKTtcclxuICBsZXQgdXNlclJlc3RpbmdEdXJhdGlvbiA9IGdldFVzZXJSZXN0aW5nRHVyYXRpb24oKTtcclxuICBsZXQgdXNlckV4ZXJjaXNlRHVyYXRpb24gPSBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpO1xyXG5cclxuICBpZiAoZGF5KSB7XHJcbiAgICBpZiAodXNlckV4ZXJjaXNlRHVyYXRpb24gPiAxNDQwKSB1c2VyRXhlcmNpc2VEdXJhdGlvbiA9IDE0NDA7XHJcbiAgICB1c2VyUmVzdGluZ0R1cmF0aW9uID0gMTQ0MCAtIHVzZXJFeGVyY2lzZUR1cmF0aW9uO1xyXG4gIH1cclxuXHJcbiAgLy8gY29uc29sZS5sb2codXNlckV4ZXJjaXNlRHVyYXRpb24pO1xyXG4gIC8vIGNvbnNvbGUubG9nKHVzZXJSZXN0aW5nRHVyYXRpb24pO1xyXG5cclxuICAvLyBSZXN0aW5nIE1hc3MgLy9cclxuICBjb25zdCB1c2VyUmVzdGluZ01pbnV0ZVZvbHVtZSA9IGNhbGN1bGF0ZU1pbnV0ZVZlbnRpbGF0aW9uRnJvbUhlYXJ0UmF0ZShcclxuICAgIGdldFVzZXJSZXN0aW5nSGVhcnRSYXRlKClcclxuICApO1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nVm9sdW1lQnJlYXRoZWQgPSBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChcclxuICAgIHVzZXJSZXN0aW5nTWludXRlVm9sdW1lLFxyXG4gICAgdXNlclJlc3RpbmdEdXJhdGlvblxyXG4gICk7XHJcbiAgY29uc3QgdXNlclJlc3RpbmdQTTI1TWFzcyA9IGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoXHJcbiAgICBQTTI1Q29uY2VudHJhdGlvbixcclxuICAgIHVzZXJSZXN0aW5nVm9sdW1lQnJlYXRoZWRcclxuICApO1xyXG4gIC8vIC8vXHJcblxyXG4gIC8vIEV4ZXJjaXNlIE1hc3MgLy9cclxuICBjb25zdCB1c2VyRXhlcmNpc2VNaW51dGVWb2x1bWUgPSBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoXHJcbiAgICBnZXRVc2VyRXhlcmNpc2VIZWFydFJhdGUoKVxyXG4gICk7XHJcbiAgY29uc3QgdXNlckV4ZXJjaXNlVm9sdW1lQnJlYXRoZWQgPSBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChcclxuICAgIHVzZXJFeGVyY2lzZU1pbnV0ZVZvbHVtZSxcclxuICAgIHVzZXJFeGVyY2lzZUR1cmF0aW9uXHJcbiAgKTtcclxuICBjb25zdCB1c2VyRXhlcmNpc2VQTTI1TWFzcyA9IGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoXHJcbiAgICBQTTI1Q29uY2VudHJhdGlvbixcclxuICAgIHVzZXJFeGVyY2lzZVZvbHVtZUJyZWF0aGVkXHJcbiAgKTtcclxuICAvLyAvL1xyXG5cclxuICAvLyByb3VuZCByZXN1bHQgdG8gbmVhcmVzdCBpbnRlZ2VyXHJcbiAgY29uc3QgdXNlclJlc3RpbmdQTTI1TWFzc1JvdW5kZWQgPSBNYXRoLnJvdW5kKHVzZXJSZXN0aW5nUE0yNU1hc3MpO1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZVBNMjVNYXNzUm91bmRlZCA9IE1hdGgucm91bmQodXNlckV4ZXJjaXNlUE0yNU1hc3MpO1xyXG4gIGNvbnN0IHRvdGFsUE0yNU1hc3MgPVxyXG4gICAgdXNlclJlc3RpbmdQTTI1TWFzc1JvdW5kZWQgKyB1c2VyRXhlcmNpc2VQTTI1TWFzc1JvdW5kZWQ7XHJcbiAgcmV0dXJuIHRvdGFsUE0yNU1hc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9DaWdhcmV0dGVQZXJjZW50YWdlKHBtMjUpIHtcclxuICAvLyBwbTI1IGNvbWVzIGluIGFzIG1pY3JvZ3JhbXMsIGEgY29tbW9uIGNpZ2FyZXR0ZSBoYXMgMTIsMDAwIG1pY3JvZ3JhbXMgb2YgUE0yLjVcclxuICAvLyBtdWxpdHBseSBidXQgMTAwIGZvciBwZXJjZW50YWdlIG9mIGEgY2lnYXJldHRlIGJyZWF0aGVkIGZvciB0aGUgZ2l2ZW4gUE0yLjUgbWFzc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnQgPSAocG0yNSAvIDEyMDAwKSAqIDEwMDtcclxuXHJcbiAgLy8gcm91bmQgcmVzdWx0IHRvIHR3byBkZWNpbWFsIHBsYWNlc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkID0gTnVtYmVyKGNpZ2FyZXR0ZVBlcmNlbnQudG9GaXhlZCgyKSk7XHJcbiAgcmV0dXJuIGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==