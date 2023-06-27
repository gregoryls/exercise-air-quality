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
  const checkFemale = document.getElementById("genderCheckbox").checked;
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

  console.log(userExerciseDuration);
  console.log(userRestingDuration);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS8uL3NyYy9tYXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQVFJID0gQWlyIFF1YWxpdHkgSW5kZXhcclxuLy8gUE0yLjUgPSBQYXJ0aWN1bGF0ZSBNYXR0ZXIgMi41IG1pY3JvbWV0ZXIgcGFydGljbGVzXHJcbi8vIFZlID0gTWludXRlIFZlbnRpbGF0aW9uLCB0aGUgYW1vdW50IG9mIGFpciBicmVhdGhlZCB1c3VhbGx5IExpdGVycy9taW51dGVcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoaGVhcnRSYXRlKSB7XHJcbiAgLy8gcmV0dXJuIDAgYnkgZm9yY2UgdG8gYXZvaWQgaXNzdWVzIHdpdGggZXhwKDApID0gMSBnaXZpbmcgYSBzbWFsbCBtaW51dGUgdmVudGlsYXRpb24gZnJvbSBoZWFydCByYXRlIG9mIHplcm9cclxuICBpZiAoaGVhcnRSYXRlID09PSAwKSByZXR1cm4gMDtcclxuXHJcbiAgLy8gYm9vbGVhbiBmb3IgdXNlciBzZWxlY3Rpb24gb2YgJ0ZlbWFsZT8nIGNoZWNrYm94XHJcbiAgY29uc3QgY2hlY2tGZW1hbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdlbmRlckNoZWNrYm94XCIpLmNoZWNrZWQ7XHJcbiAgY29uc3QgbWludXRlVmVudGlsYXRpb24gPSBNYXRoLmV4cCgxLjE2MiArIDAuMDIxICogaGVhcnRSYXRlKTtcclxuXHJcbiAgLy8gY29udmVydCBzdGFuZGFyZCBMaXRlcnMvbWludXRlIHVuaXRzIHRvIG1eMy9taW51dGUgdG8gbWF0Y2ggd2l0aCBzdGFuZGFyZCBwbTIuNSBjb25jZW50cmF0aW9uIHVuaXRzXHJcbiAgY29uc3QgbWludXRlVmVudGlsYXRpb25NMyA9IG1pbnV0ZVZlbnRpbGF0aW9uIC8gMTAwMDtcclxuXHJcbiAgLy8gd29tZW4gaGF2ZSBsdW5ncyA3NSUgdGhlIHNpemUgb2YgbWVuIC0gYXBwbHkgY29ycmVjdGlvbiBmYWN0b3JcclxuICBpZiAoY2hlY2tGZW1hbGUpIHJldHVybiBtaW51dGVWZW50aWxhdGlvbk0zICogMC43NTtcclxuICByZXR1cm4gbWludXRlVmVudGlsYXRpb25NMztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShBUUkpIHtcclxuICBsZXQgSWg7XHJcbiAgbGV0IElsO1xyXG4gIGxldCBCUGg7XHJcbiAgbGV0IEJQbDtcclxuXHJcbiAgaWYgKEFRSSA+PSAwKSB7XHJcbiAgICBJaCA9IDUwO1xyXG4gICAgSWwgPSAwO1xyXG4gICAgQlBoID0gMTI7XHJcbiAgICBCUGwgPSAwO1xyXG4gIH1cclxuICBpZiAoQVFJID49IDUxKSB7XHJcbiAgICBJaCA9IDEwMDtcclxuICAgIElsID0gNTE7XHJcbiAgICBCUGggPSAzNS40O1xyXG4gICAgQlBsID0gMTIuMTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAxMDEpIHtcclxuICAgIEloID0gMTUwO1xyXG4gICAgSWwgPSAxMDE7XHJcbiAgICBCUGggPSA1NS40O1xyXG4gICAgQlBsID0gMzUuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAxNTEpIHtcclxuICAgIEloID0gMjAwO1xyXG4gICAgSWwgPSAxNTE7XHJcbiAgICBCUGggPSAxNTAuNDtcclxuICAgIEJQbCA9IDU1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMjAxKSB7XHJcbiAgICBJaCA9IDMwMDtcclxuICAgIElsID0gMjAxO1xyXG4gICAgQlBoID0gMjUwLjQ7XHJcbiAgICBCUGwgPSAxNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAzMDEpIHtcclxuICAgIEloID0gNDAwO1xyXG4gICAgSWwgPSAzMDE7XHJcbiAgICBCUGggPSAzNTAuNDtcclxuICAgIEJQbCA9IDI1MC41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDQwMSkge1xyXG4gICAgSWggPSA1MDA7XHJcbiAgICBJbCA9IDQwMTtcclxuICAgIEJQaCA9IDUwMC40O1xyXG4gICAgQlBsID0gMzUwLjU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgKEFRSSArICgoSWggLSBJbCkgLyAoQlBoIC0gQlBsKSkgKiBCUGwgLSBJbCkgLyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVJlbGF0aXZlUmlza0x1bmdDYW5jZXJNb3J0YWxpdHkobWFzcywgcm91bmRpbmcpIHtcclxuICAvLyB0aGlzIGZ1bmN0aW9uIGV4cGVjdHMgbWFzcyBpbnB1dCB3aXRoIHVuaXRzIG9mIG1pbGxpZ3JhbXMobWcpXHJcbiAgY29uc3QgcmlzayA9IDEgKyAwLjMxOTUgKiBtYXNzICoqIDAuNzQzMztcclxuICBpZiAoIXJvdW5kaW5nKSByZXR1cm4gcmlzaztcclxuICBjb25zdCByaXNrUm91bmRlZCA9IHJpc2sudG9GaXhlZCgyKTtcclxuICByZXR1cm4gcmlza1JvdW5kZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVSZWxhdGl2ZVJpc2tDVkRNb3J0YWxpdHkobWFzcywgcm91bmRpbmcpIHtcclxuICAvLyB0aGlzIGZ1bmN0aW9uIGV4cGVjdHMgbWFzcyBpbnB1dCB3aXRoIHVuaXRzIG9mIG1pbGxpZ3JhbXMobWcpXHJcbiAgLy8gdGhpcyBjb3ZlcnMgaXNjaGVtaWMgaGVhcnQgZGlzZWFzZShJSEQpLCBjYXJkaWF2YXNjdWxhciBkaXNlYXNlKENWRCksIGFuZCBjYXJkaW9wdWxtb25hcnkgZGlzZWFzZShDUEQpXHJcbiAgY29uc3QgcmlzayA9IDEgKyAwLjI2ODUgKiBtYXNzICoqIDAuMjczO1xyXG4gIGlmICghcm91bmRpbmcpIHJldHVybiByaXNrO1xyXG4gIGNvbnN0IHJpc2tSb3VuZGVkID0gcmlzay50b0ZpeGVkKDIpO1xyXG4gIHJldHVybiByaXNrUm91bmRlZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKG1pbnV0ZVZlbnRpbGF0aW9uLCBtaW51dGVzKSB7XHJcbiAgLy8gdW5pdHMgaW4gbV4zLCBiYXNlZCBvbiBtaW51dGUgdmVudGlsYXRpb24gZnVuY3Rpb25cclxuICBjb25zdCB2b2x1bWUgPSBtaW51dGVWZW50aWxhdGlvbiAqIG1pbnV0ZXM7XHJcbiAgcmV0dXJuIHZvbHVtZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoY29uY2VudHJhdGlvbiwgdm9sdW1lKSB7XHJcbiAgY29uc3QgUE0yNU1hc3MgPSBjb25jZW50cmF0aW9uICogdm9sdW1lO1xyXG4gIHJldHVybiBOdW1iZXIoUE0yNU1hc3MpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFRSSgpIHtcclxuICBjb25zdCB1c2VyQVFJID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyQVFJXCIpO1xyXG4gIHJldHVybiBOdW1iZXIodXNlckFRSS52YWx1ZSk7XHJcbn1cclxuXHJcbi8vIFJlc3RpbmcgSW5wdXRzLy9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IHVzZXJIZWFydFJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJIZWFydFJhdGVcIik7XHJcbiAgcmV0dXJuIE51bWJlcih1c2VySGVhcnRSYXRlLnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nRHVyYXRpb24oKSB7XHJcbiAgbGV0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyUmVzdGluZ0R1cmF0aW9uXCIpO1xyXG4gIC8vIGNvbnZlcnQgaW5wdXQgZnJvbSBob3VycyB0byBtaW51dGVzXHJcbiAgZHVyYXRpb24gPSBOdW1iZXIoZHVyYXRpb24udmFsdWUgKiA2MCk7XHJcbiAgcmV0dXJuIGR1cmF0aW9uO1xyXG59XHJcbi8vIC8vXHJcblxyXG4vLyBFeGVyY2lzZSBJbnB1dHMvL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckV4ZXJjaXNlSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IGV4ZXJjaXNlSGVhcnRSYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyRXhlcmNpc2VIZWFydFJhdGVcIik7XHJcbiAgcmV0dXJuIE51bWJlcihleGVyY2lzZUhlYXJ0UmF0ZS52YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpIHtcclxuICBjb25zdCBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckV4ZXJjaXNlRHVyYXRpb25cIik7XHJcbiAgcmV0dXJuIE51bWJlcihkdXJhdGlvbi52YWx1ZSk7XHJcbn1cclxuLy8gLy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUb3RhbEV4cG9zdXJlVGltZSgpIHtcclxuICBjb25zdCByZXN0VGltZSA9IGdldFVzZXJSZXN0aW5nRHVyYXRpb24oKTtcclxuICBjb25zdCBleGVyY2lzZVRpbWUgPSBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpO1xyXG4gIGNvbnN0IHRvdGFsVGltZSA9IHJlc3RUaW1lICsgZXhlcmNpc2VUaW1lO1xyXG5cclxuICByZXR1cm4gdG90YWxUaW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVXNlclBNMjVNYXNzKGRheSkge1xyXG4gIC8vIGRheSBhcmcgdGFrZXMgYm9vbGVhbiB0byBzd2l0Y2ggYmV0d2VlbiByYXcgdXNlciBpbnB1dCBhbmQgZm9yY2VkIDI0aHIgdGltZSBwZXJpb2RcclxuICAvLyBmaW5hbCB1bml0IGlzIGluIG1pY3JvZ3JhbXNcclxuICBjb25zdCBQTTI1Q29uY2VudHJhdGlvbiA9IFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShnZXRVc2VyQVFJKCkpO1xyXG4gIGxldCB1c2VyUmVzdGluZ0R1cmF0aW9uID0gZ2V0VXNlclJlc3RpbmdEdXJhdGlvbigpO1xyXG4gIGxldCB1c2VyRXhlcmNpc2VEdXJhdGlvbiA9IGdldFVzZXJFeGVyY2lzZUR1cmF0aW9uKCk7XHJcblxyXG4gIGlmIChkYXkpIHtcclxuICAgIGlmICh1c2VyRXhlcmNpc2VEdXJhdGlvbiA+IDE0NDApIHVzZXJFeGVyY2lzZUR1cmF0aW9uID0gMTQ0MDtcclxuICAgIHVzZXJSZXN0aW5nRHVyYXRpb24gPSAxNDQwIC0gdXNlckV4ZXJjaXNlRHVyYXRpb247XHJcbiAgfVxyXG5cclxuICBjb25zb2xlLmxvZyh1c2VyRXhlcmNpc2VEdXJhdGlvbik7XHJcbiAgY29uc29sZS5sb2codXNlclJlc3RpbmdEdXJhdGlvbik7XHJcblxyXG4gIC8vIFJlc3RpbmcgTWFzcyAvL1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKVxyXG4gICk7XHJcbiAgY29uc3QgdXNlclJlc3RpbmdWb2x1bWVCcmVhdGhlZCA9IGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKFxyXG4gICAgdXNlclJlc3RpbmdNaW51dGVWb2x1bWUsXHJcbiAgICB1c2VyUmVzdGluZ0R1cmF0aW9uXHJcbiAgKTtcclxuICBjb25zdCB1c2VyUmVzdGluZ1BNMjVNYXNzID0gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChcclxuICAgIFBNMjVDb25jZW50cmF0aW9uLFxyXG4gICAgdXNlclJlc3RpbmdWb2x1bWVCcmVhdGhlZFxyXG4gICk7XHJcbiAgLy8gLy9cclxuXHJcbiAgLy8gRXhlcmNpc2UgTWFzcyAvL1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZU1pbnV0ZVZvbHVtZSA9IGNhbGN1bGF0ZU1pbnV0ZVZlbnRpbGF0aW9uRnJvbUhlYXJ0UmF0ZShcclxuICAgIGdldFVzZXJFeGVyY2lzZUhlYXJ0UmF0ZSgpXHJcbiAgKTtcclxuICBjb25zdCB1c2VyRXhlcmNpc2VWb2x1bWVCcmVhdGhlZCA9IGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKFxyXG4gICAgdXNlckV4ZXJjaXNlTWludXRlVm9sdW1lLFxyXG4gICAgdXNlckV4ZXJjaXNlRHVyYXRpb25cclxuICApO1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZVBNMjVNYXNzID0gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChcclxuICAgIFBNMjVDb25jZW50cmF0aW9uLFxyXG4gICAgdXNlckV4ZXJjaXNlVm9sdW1lQnJlYXRoZWRcclxuICApO1xyXG4gIC8vIC8vXHJcblxyXG4gIC8vIHJvdW5kIHJlc3VsdCB0byBuZWFyZXN0IGludGVnZXJcclxuICBjb25zdCB1c2VyUmVzdGluZ1BNMjVNYXNzUm91bmRlZCA9IE1hdGgucm91bmQodXNlclJlc3RpbmdQTTI1TWFzcyk7XHJcbiAgY29uc3QgdXNlckV4ZXJjaXNlUE0yNU1hc3NSb3VuZGVkID0gTWF0aC5yb3VuZCh1c2VyRXhlcmNpc2VQTTI1TWFzcyk7XHJcbiAgY29uc3QgdG90YWxQTTI1TWFzcyA9XHJcbiAgICB1c2VyUmVzdGluZ1BNMjVNYXNzUm91bmRlZCArIHVzZXJFeGVyY2lzZVBNMjVNYXNzUm91bmRlZDtcclxuICByZXR1cm4gdG90YWxQTTI1TWFzcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0NpZ2FyZXR0ZVBlcmNlbnRhZ2UocG0yNSkge1xyXG4gIC8vIHBtMjUgY29tZXMgaW4gYXMgbWljcm9ncmFtcywgYSBjb21tb24gY2lnYXJldHRlIGhhcyAxMiwwMDAgbWljcm9ncmFtcyBvZiBQTTIuNVxyXG4gIC8vIG11bGl0cGx5IGJ1dCAxMDAgZm9yIHBlcmNlbnRhZ2Ugb2YgYSBjaWdhcmV0dGUgYnJlYXRoZWQgZm9yIHRoZSBnaXZlbiBQTTIuNSBtYXNzXHJcbiAgY29uc3QgY2lnYXJldHRlUGVyY2VudCA9IChwbTI1IC8gMTIwMDApICogMTAwO1xyXG5cclxuICAvLyByb3VuZCByZXN1bHQgdG8gdHdvIGRlY2ltYWwgcGxhY2VzXHJcbiAgY29uc3QgY2lnYXJldHRlUGVyY2VudFJvdW5kZWQgPSBOdW1iZXIoY2lnYXJldHRlUGVyY2VudC50b0ZpeGVkKDIpKTtcclxuICByZXR1cm4gY2lnYXJldHRlUGVyY2VudFJvdW5kZWQ7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9