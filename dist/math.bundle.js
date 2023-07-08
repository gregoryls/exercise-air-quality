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
/* harmony export */   "calculateRelativeRiskCVDMortality": () => (/* binding */ calculateRelativeRiskCVDMortality),
/* harmony export */   "calculateRelativeRiskLungCancerMortality": () => (/* binding */ calculateRelativeRiskLungCancerMortality),
/* harmony export */   "calculateUserPM25Mass": () => (/* binding */ calculateUserPM25Mass),
/* harmony export */   "convertToCigarettePercentage": () => (/* binding */ convertToCigarettePercentage)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5Ly4vc3JjL21hdGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBBUUkgPSBBaXIgUXVhbGl0eSBJbmRleFxyXG4vLyBQTTIuNSA9IFBhcnRpY3VsYXRlIE1hdHRlciAyLjUgbWljcm9tZXRlciBwYXJ0aWNsZXNcclxuLy8gVmUgPSBNaW51dGUgVmVudGlsYXRpb24sIHRoZSBhbW91bnQgb2YgYWlyIGJyZWF0aGVkIHVzdWFsbHkgTGl0ZXJzL21pbnV0ZVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKGhlYXJ0UmF0ZSkge1xyXG4gIC8vIHJldHVybiAwIGJ5IGZvcmNlIHRvIGF2b2lkIGlzc3VlcyB3aXRoIGV4cCgwKSA9IDEgZ2l2aW5nIGEgc21hbGwgbWludXRlIHZlbnRpbGF0aW9uIGZyb20gaGVhcnQgcmF0ZSBvZiB6ZXJvXHJcbiAgaWYgKGhlYXJ0UmF0ZSA9PT0gMCkgcmV0dXJuIDA7XHJcblxyXG4gIC8vIGJvb2xlYW4gZm9yIHVzZXIgc2VsZWN0aW9uIG9mICdGZW1hbGU/JyBjaGVja2JveFxyXG4gIGNvbnN0IGNoZWNrRmVtYWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZW1hbGVcIikuY2hlY2tlZDtcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbiA9IE1hdGguZXhwKDEuMTYyICsgMC4wMjEgKiBoZWFydFJhdGUpO1xyXG5cclxuICAvLyBjb252ZXJ0IHN0YW5kYXJkIExpdGVycy9taW51dGUgdW5pdHMgdG8gbV4zL21pbnV0ZSB0byBtYXRjaCB3aXRoIHN0YW5kYXJkIHBtMi41IGNvbmNlbnRyYXRpb24gdW5pdHNcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbk0zID0gbWludXRlVmVudGlsYXRpb24gLyAxMDAwO1xyXG5cclxuICAvLyB3b21lbiBoYXZlIGx1bmdzIDc1JSB0aGUgc2l6ZSBvZiBtZW4gLSBhcHBseSBjb3JyZWN0aW9uIGZhY3RvclxyXG4gIGlmIChjaGVja0ZlbWFsZSkgcmV0dXJuIG1pbnV0ZVZlbnRpbGF0aW9uTTMgKiAwLjc1O1xyXG4gIHJldHVybiBtaW51dGVWZW50aWxhdGlvbk0zO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoQVFJKSB7XHJcbiAgbGV0IEloO1xyXG4gIGxldCBJbDtcclxuICBsZXQgQlBoO1xyXG4gIGxldCBCUGw7XHJcblxyXG4gIGlmIChBUUkgPj0gMCkge1xyXG4gICAgSWggPSA1MDtcclxuICAgIElsID0gMDtcclxuICAgIEJQaCA9IDEyO1xyXG4gICAgQlBsID0gMDtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA1MSkge1xyXG4gICAgSWggPSAxMDA7XHJcbiAgICBJbCA9IDUxO1xyXG4gICAgQlBoID0gMzUuNDtcclxuICAgIEJQbCA9IDEyLjE7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTAxKSB7XHJcbiAgICBJaCA9IDE1MDtcclxuICAgIElsID0gMTAxO1xyXG4gICAgQlBoID0gNTUuNDtcclxuICAgIEJQbCA9IDM1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTUxKSB7XHJcbiAgICBJaCA9IDIwMDtcclxuICAgIElsID0gMTUxO1xyXG4gICAgQlBoID0gMTUwLjQ7XHJcbiAgICBCUGwgPSA1NS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDIwMSkge1xyXG4gICAgSWggPSAzMDA7XHJcbiAgICBJbCA9IDIwMTtcclxuICAgIEJQaCA9IDI1MC40O1xyXG4gICAgQlBsID0gMTUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMzAxKSB7XHJcbiAgICBJaCA9IDQwMDtcclxuICAgIElsID0gMzAxO1xyXG4gICAgQlBoID0gMzUwLjQ7XHJcbiAgICBCUGwgPSAyNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA0MDEpIHtcclxuICAgIEloID0gNTAwO1xyXG4gICAgSWwgPSA0MDE7XHJcbiAgICBCUGggPSA1MDAuNDtcclxuICAgIEJQbCA9IDM1MC41O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIChBUUkgKyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpICogQlBsIC0gSWwpIC8gKChJaCAtIElsKSAvIChCUGggLSBCUGwpKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVSZWxhdGl2ZVJpc2tMdW5nQ2FuY2VyTW9ydGFsaXR5KG1hc3MsIHJvdW5kaW5nKSB7XHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBleHBlY3RzIG1hc3MgaW5wdXQgd2l0aCB1bml0cyBvZiBtaWxsaWdyYW1zKG1nKVxyXG4gIGNvbnN0IHJpc2sgPSAxICsgMC4zMTk1ICogbWFzcyAqKiAwLjc0MzM7XHJcbiAgaWYgKCFyb3VuZGluZykgcmV0dXJuIHJpc2s7XHJcbiAgY29uc3Qgcmlza1JvdW5kZWQgPSByaXNrLnRvRml4ZWQoMik7XHJcbiAgcmV0dXJuIHJpc2tSb3VuZGVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUmVsYXRpdmVSaXNrQ1ZETW9ydGFsaXR5KG1hc3MsIHJvdW5kaW5nKSB7XHJcbiAgLy8gdGhpcyBmdW5jdGlvbiBleHBlY3RzIG1hc3MgaW5wdXQgd2l0aCB1bml0cyBvZiBtaWxsaWdyYW1zKG1nKVxyXG4gIC8vIHRoaXMgY292ZXJzIGlzY2hlbWljIGhlYXJ0IGRpc2Vhc2UoSUhEKSwgY2FyZGlhdmFzY3VsYXIgZGlzZWFzZShDVkQpLCBhbmQgY2FyZGlvcHVsbW9uYXJ5IGRpc2Vhc2UoQ1BEKVxyXG4gIGNvbnN0IHJpc2sgPSAxICsgMC4yNjg1ICogbWFzcyAqKiAwLjI3MztcclxuICBpZiAoIXJvdW5kaW5nKSByZXR1cm4gcmlzaztcclxuICBjb25zdCByaXNrUm91bmRlZCA9IHJpc2sudG9GaXhlZCgyKTtcclxuICByZXR1cm4gcmlza1JvdW5kZWQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKG1pbnV0ZVZlbnRpbGF0aW9uLCBtaW51dGVzKSB7XHJcbiAgLy8gdW5pdHMgaW4gbV4zLCBiYXNlZCBvbiBtaW51dGUgdmVudGlsYXRpb24gZnVuY3Rpb25cclxuICBjb25zdCB2b2x1bWUgPSBtaW51dGVWZW50aWxhdGlvbiAqIG1pbnV0ZXM7XHJcbiAgcmV0dXJuIHZvbHVtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChjb25jZW50cmF0aW9uLCB2b2x1bWUpIHtcclxuICBjb25zdCBQTTI1TWFzcyA9IGNvbmNlbnRyYXRpb24gKiB2b2x1bWU7XHJcbiAgcmV0dXJuIE51bWJlcihQTTI1TWFzcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFVzZXJBUUkoKSB7XHJcbiAgY29uc3QgdXNlckFRSSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckFRSVwiKTtcclxuICByZXR1cm4gTnVtYmVyKHVzZXJBUUkudmFsdWUpO1xyXG59XHJcblxyXG4vLyBSZXN0aW5nIElucHV0cy8vXHJcbmZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IHVzZXJIZWFydFJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJIZWFydFJhdGVcIik7XHJcbiAgcmV0dXJuIE51bWJlcih1c2VySGVhcnRSYXRlLnZhbHVlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VXNlclJlc3RpbmdEdXJhdGlvbigpIHtcclxuICBsZXQgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJSZXN0aW5nRHVyYXRpb25cIik7XHJcbiAgLy8gY29udmVydCBpbnB1dCBmcm9tIGhvdXJzIHRvIG1pbnV0ZXNcclxuICBkdXJhdGlvbiA9IE51bWJlcihkdXJhdGlvbi52YWx1ZSAqIDYwKTtcclxuICByZXR1cm4gZHVyYXRpb247XHJcbn1cclxuLy8gLy9cclxuXHJcbi8vIEV4ZXJjaXNlIElucHV0cy8vXHJcbmZ1bmN0aW9uIGdldFVzZXJFeGVyY2lzZUhlYXJ0UmF0ZSgpIHtcclxuICBjb25zdCBleGVyY2lzZUhlYXJ0UmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckV4ZXJjaXNlSGVhcnRSYXRlXCIpO1xyXG4gIHJldHVybiBOdW1iZXIoZXhlcmNpc2VIZWFydFJhdGUudmFsdWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpIHtcclxuICBjb25zdCBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckV4ZXJjaXNlRHVyYXRpb25cIik7XHJcbiAgcmV0dXJuIE51bWJlcihkdXJhdGlvbi52YWx1ZSk7XHJcbn1cclxuLy8gLy9cclxuXHJcbmZ1bmN0aW9uIGNhbGN1bGF0ZVRvdGFsRXhwb3N1cmVUaW1lKCkge1xyXG4gIGNvbnN0IHJlc3RUaW1lID0gZ2V0VXNlclJlc3RpbmdEdXJhdGlvbigpO1xyXG4gIGNvbnN0IGV4ZXJjaXNlVGltZSA9IGdldFVzZXJFeGVyY2lzZUR1cmF0aW9uKCk7XHJcbiAgY29uc3QgdG90YWxUaW1lID0gcmVzdFRpbWUgKyBleGVyY2lzZVRpbWU7XHJcblxyXG4gIHJldHVybiB0b3RhbFRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVVc2VyUE0yNU1hc3MoZGF5KSB7XHJcbiAgLy8gZGF5IGFyZyB0YWtlcyBib29sZWFuIHRvIHN3aXRjaCBiZXR3ZWVuIHJhdyB1c2VyIGlucHV0IGFuZCBmb3JjZWQgMjRociB0aW1lIHBlcmlvZFxyXG4gIC8vIGZpbmFsIHVuaXQgaXMgaW4gbWljcm9ncmFtc1xyXG4gIGNvbnN0IFBNMjVDb25jZW50cmF0aW9uID0gUE0yNUNvbmNlbnRyYXRpb25Gcm9tQVFJKGdldFVzZXJBUUkoKSk7XHJcbiAgbGV0IHVzZXJSZXN0aW5nRHVyYXRpb24gPSBnZXRVc2VyUmVzdGluZ0R1cmF0aW9uKCk7XHJcbiAgbGV0IHVzZXJFeGVyY2lzZUR1cmF0aW9uID0gZ2V0VXNlckV4ZXJjaXNlRHVyYXRpb24oKTtcclxuXHJcbiAgaWYgKGRheSkge1xyXG4gICAgaWYgKHVzZXJFeGVyY2lzZUR1cmF0aW9uID4gMTQ0MCkgdXNlckV4ZXJjaXNlRHVyYXRpb24gPSAxNDQwO1xyXG4gICAgdXNlclJlc3RpbmdEdXJhdGlvbiA9IDE0NDAgLSB1c2VyRXhlcmNpc2VEdXJhdGlvbjtcclxuICB9XHJcblxyXG4gIC8vIGNvbnNvbGUubG9nKHVzZXJFeGVyY2lzZUR1cmF0aW9uKTtcclxuICAvLyBjb25zb2xlLmxvZyh1c2VyUmVzdGluZ0R1cmF0aW9uKTtcclxuXHJcbiAgLy8gUmVzdGluZyBNYXNzIC8vXHJcbiAgY29uc3QgdXNlclJlc3RpbmdNaW51dGVWb2x1bWUgPSBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoXHJcbiAgICBnZXRVc2VyUmVzdGluZ0hlYXJ0UmF0ZSgpXHJcbiAgKTtcclxuICBjb25zdCB1c2VyUmVzdGluZ1ZvbHVtZUJyZWF0aGVkID0gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQoXHJcbiAgICB1c2VyUmVzdGluZ01pbnV0ZVZvbHVtZSxcclxuICAgIHVzZXJSZXN0aW5nRHVyYXRpb25cclxuICApO1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nUE0yNU1hc3MgPSBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKFxyXG4gICAgUE0yNUNvbmNlbnRyYXRpb24sXHJcbiAgICB1c2VyUmVzdGluZ1ZvbHVtZUJyZWF0aGVkXHJcbiAgKTtcclxuICAvLyAvL1xyXG5cclxuICAvLyBFeGVyY2lzZSBNYXNzIC8vXHJcbiAgY29uc3QgdXNlckV4ZXJjaXNlTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlckV4ZXJjaXNlSGVhcnRSYXRlKClcclxuICApO1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZVZvbHVtZUJyZWF0aGVkID0gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQoXHJcbiAgICB1c2VyRXhlcmNpc2VNaW51dGVWb2x1bWUsXHJcbiAgICB1c2VyRXhlcmNpc2VEdXJhdGlvblxyXG4gICk7XHJcbiAgY29uc3QgdXNlckV4ZXJjaXNlUE0yNU1hc3MgPSBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKFxyXG4gICAgUE0yNUNvbmNlbnRyYXRpb24sXHJcbiAgICB1c2VyRXhlcmNpc2VWb2x1bWVCcmVhdGhlZFxyXG4gICk7XHJcbiAgLy8gLy9cclxuXHJcbiAgLy8gcm91bmQgcmVzdWx0IHRvIG5lYXJlc3QgaW50ZWdlclxyXG4gIGNvbnN0IHVzZXJSZXN0aW5nUE0yNU1hc3NSb3VuZGVkID0gTWF0aC5yb3VuZCh1c2VyUmVzdGluZ1BNMjVNYXNzKTtcclxuICBjb25zdCB1c2VyRXhlcmNpc2VQTTI1TWFzc1JvdW5kZWQgPSBNYXRoLnJvdW5kKHVzZXJFeGVyY2lzZVBNMjVNYXNzKTtcclxuICBjb25zdCB0b3RhbFBNMjVNYXNzID1cclxuICAgIHVzZXJSZXN0aW5nUE0yNU1hc3NSb3VuZGVkICsgdXNlckV4ZXJjaXNlUE0yNU1hc3NSb3VuZGVkO1xyXG4gIHJldHVybiB0b3RhbFBNMjVNYXNzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvQ2lnYXJldHRlUGVyY2VudGFnZShwbTI1KSB7XHJcbiAgLy8gcG0yNSBjb21lcyBpbiBhcyBtaWNyb2dyYW1zLCBhIGNvbW1vbiBjaWdhcmV0dGUgaGFzIDEyLDAwMCBtaWNyb2dyYW1zIG9mIFBNMi41XHJcbiAgLy8gbXVsaXRwbHkgYnV0IDEwMCBmb3IgcGVyY2VudGFnZSBvZiBhIGNpZ2FyZXR0ZSBicmVhdGhlZCBmb3IgdGhlIGdpdmVuIFBNMi41IG1hc3NcclxuICBjb25zdCBjaWdhcmV0dGVQZXJjZW50ID0gKHBtMjUgLyAxMjAwMCkgKiAxMDA7XHJcblxyXG4gIC8vIHJvdW5kIHJlc3VsdCB0byB0d28gZGVjaW1hbCBwbGFjZXNcclxuICBjb25zdCBjaWdhcmV0dGVQZXJjZW50Um91bmRlZCA9IE51bWJlcihjaWdhcmV0dGVQZXJjZW50LnRvRml4ZWQoMikpO1xyXG4gIHJldHVybiBjaWdhcmV0dGVQZXJjZW50Um91bmRlZDtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=