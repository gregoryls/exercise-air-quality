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

function calculateVolumeAirBreathed(minuteVentilation, minutes) {
  // units in m^3, based on minute ventilation function
  const volume = minuteVentilation * minutes;
  return volume;
}

function calculatePM25MassBreathed(concentration, volume) {
  const PM25Mass = concentration * volume;
  return PM25Mass;
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

function calculateUserPM25Mass() {
  // final unit is in micrograms
  const PM25Concentration = PM25ConcentrationFromAQI(getUserAQI());

  // Resting Mass //
  const userRestingMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserRestingHeartRate()
  );
  const userRestingVolumeBreathed = calculateVolumeAirBreathed(
    userRestingMinuteVolume,
    getUserRestingDuration()
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
    getUserExerciseDuration()
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5Ly4vc3JjL21hdGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBBUUkgPSBBaXIgUXVhbGl0eSBJbmRleFxyXG4vLyBQTTIuNSA9IFBhcnRpY3VsYXRlIE1hdHRlciAyLjUgbWljcm9tZXRlciBwYXJ0aWNsZXNcclxuLy8gVmUgPSBNaW51dGUgVmVudGlsYXRpb24sIHRoZSBhbW91bnQgb2YgYWlyIGJyZWF0aGVkIHVzdWFsbHkgTGl0ZXJzL21pbnV0ZVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZU1pbnV0ZVZlbnRpbGF0aW9uRnJvbUhlYXJ0UmF0ZShoZWFydFJhdGUpIHtcclxuICAvLyBib29sZWFuIGZvciB1c2VyIHNlbGVjdGlvbiBvZiAnRmVtYWxlPycgY2hlY2tib3hcclxuICBjb25zdCBjaGVja0ZlbWFsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuZGVyQ2hlY2tib3hcIikuY2hlY2tlZDtcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbiA9IE1hdGguZXhwKDEuMTYyICsgMC4wMjEgKiBoZWFydFJhdGUpO1xyXG5cclxuICAvLyBjb252ZXJ0IHN0YW5kYXJkIExpdGVycy9taW51dGUgdW5pdHMgdG8gbV4zL21pbnV0ZSB0byBtYXRjaCB3aXRoIHN0YW5kYXJkIHBtMi41IGNvbmNlbnRyYXRpb24gdW5pdHNcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbk0zID0gbWludXRlVmVudGlsYXRpb24gLyAxMDAwO1xyXG5cclxuICAvLyB3b21lbiBoYXZlIGx1bmdzIDc1JSB0aGUgc2l6ZSBvZiBtZW4gLSBhcHBseSBjb3JyZWN0aW9uIGZhY3RvclxyXG4gIGlmIChjaGVja0ZlbWFsZSkgcmV0dXJuIG1pbnV0ZVZlbnRpbGF0aW9uTTMgKiAwLjc1O1xyXG4gIHJldHVybiBtaW51dGVWZW50aWxhdGlvbk0zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUE0yNUNvbmNlbnRyYXRpb25Gcm9tQVFJKEFRSSkge1xyXG4gIGxldCBJaDtcclxuICBsZXQgSWw7XHJcbiAgbGV0IEJQaDtcclxuICBsZXQgQlBsO1xyXG5cclxuICBpZiAoQVFJID49IDApIHtcclxuICAgIEloID0gNTA7XHJcbiAgICBJbCA9IDA7XHJcbiAgICBCUGggPSAxMjtcclxuICAgIEJQbCA9IDA7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gNTEpIHtcclxuICAgIEloID0gMTAwO1xyXG4gICAgSWwgPSA1MTtcclxuICAgIEJQaCA9IDM1LjQ7XHJcbiAgICBCUGwgPSAxMi4xO1xyXG4gIH1cclxuICBpZiAoQVFJID49IDEwMSkge1xyXG4gICAgSWggPSAxNTA7XHJcbiAgICBJbCA9IDEwMTtcclxuICAgIEJQaCA9IDU1LjQ7XHJcbiAgICBCUGwgPSAzNS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDE1MSkge1xyXG4gICAgSWggPSAyMDA7XHJcbiAgICBJbCA9IDE1MTtcclxuICAgIEJQaCA9IDE1MC40O1xyXG4gICAgQlBsID0gNTUuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAyMDEpIHtcclxuICAgIEloID0gMzAwO1xyXG4gICAgSWwgPSAyMDE7XHJcbiAgICBCUGggPSAyNTAuNDtcclxuICAgIEJQbCA9IDE1MC41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDMwMSkge1xyXG4gICAgSWggPSA0MDA7XHJcbiAgICBJbCA9IDMwMTtcclxuICAgIEJQaCA9IDM1MC40O1xyXG4gICAgQlBsID0gMjUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gNDAxKSB7XHJcbiAgICBJaCA9IDUwMDtcclxuICAgIElsID0gNDAxO1xyXG4gICAgQlBoID0gNTAwLjQ7XHJcbiAgICBCUGwgPSAzNTAuNTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICAoQVFJICsgKChJaCAtIElsKSAvIChCUGggLSBCUGwpKSAqIEJQbCAtIElsKSAvICgoSWggLSBJbCkgLyAoQlBoIC0gQlBsKSlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQobWludXRlVmVudGlsYXRpb24sIG1pbnV0ZXMpIHtcclxuICAvLyB1bml0cyBpbiBtXjMsIGJhc2VkIG9uIG1pbnV0ZSB2ZW50aWxhdGlvbiBmdW5jdGlvblxyXG4gIGNvbnN0IHZvbHVtZSA9IG1pbnV0ZVZlbnRpbGF0aW9uICogbWludXRlcztcclxuICByZXR1cm4gdm9sdW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChjb25jZW50cmF0aW9uLCB2b2x1bWUpIHtcclxuICBjb25zdCBQTTI1TWFzcyA9IGNvbmNlbnRyYXRpb24gKiB2b2x1bWU7XHJcbiAgcmV0dXJuIFBNMjVNYXNzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFRSSgpIHtcclxuICBjb25zdCB1c2VyQVFJID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyQVFJXCIpO1xyXG4gIHJldHVybiBOdW1iZXIodXNlckFRSS52YWx1ZSk7XHJcbn1cclxuXHJcbi8vIFJlc3RpbmcgSW5wdXRzLy9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IHVzZXJIZWFydFJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJIZWFydFJhdGVcIik7XHJcbiAgcmV0dXJuIE51bWJlcih1c2VySGVhcnRSYXRlLnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nRHVyYXRpb24oKSB7XHJcbiAgbGV0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyUmVzdGluZ0R1cmF0aW9uXCIpO1xyXG4gIC8vIGNvbnZlcnQgaW5wdXQgZnJvbSBob3VycyB0byBtaW51dGVzXHJcbiAgZHVyYXRpb24gPSBOdW1iZXIoZHVyYXRpb24udmFsdWUgKiA2MCk7XHJcbiAgcmV0dXJuIGR1cmF0aW9uO1xyXG59XHJcbi8vIC8vXHJcblxyXG4vLyBFeGVyY2lzZSBJbnB1dHMvL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckV4ZXJjaXNlSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IGV4ZXJjaXNlSGVhcnRSYXRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyRXhlcmNpc2VIZWFydFJhdGVcIik7XHJcbiAgcmV0dXJuIE51bWJlcihleGVyY2lzZUhlYXJ0UmF0ZS52YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpIHtcclxuICBjb25zdCBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckV4ZXJjaXNlRHVyYXRpb25cIik7XHJcbiAgcmV0dXJuIE51bWJlcihkdXJhdGlvbi52YWx1ZSk7XHJcbn1cclxuLy8gLy9cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUb3RhbEV4cG9zdXJlVGltZSgpIHtcclxuICBjb25zdCByZXN0VGltZSA9IGdldFVzZXJSZXN0aW5nRHVyYXRpb24oKTtcclxuICBjb25zdCBleGVyY2lzZVRpbWUgPSBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpO1xyXG4gIGNvbnN0IHRvdGFsVGltZSA9IHJlc3RUaW1lICsgZXhlcmNpc2VUaW1lO1xyXG5cclxuICByZXR1cm4gdG90YWxUaW1lO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVXNlclBNMjVNYXNzKCkge1xyXG4gIC8vIGZpbmFsIHVuaXQgaXMgaW4gbWljcm9ncmFtc1xyXG4gIGNvbnN0IFBNMjVDb25jZW50cmF0aW9uID0gUE0yNUNvbmNlbnRyYXRpb25Gcm9tQVFJKGdldFVzZXJBUUkoKSk7XHJcblxyXG4gIC8vIFJlc3RpbmcgTWFzcyAvL1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKVxyXG4gICk7XHJcbiAgY29uc3QgdXNlclJlc3RpbmdWb2x1bWVCcmVhdGhlZCA9IGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKFxyXG4gICAgdXNlclJlc3RpbmdNaW51dGVWb2x1bWUsXHJcbiAgICBnZXRVc2VyUmVzdGluZ0R1cmF0aW9uKClcclxuICApO1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nUE0yNU1hc3MgPSBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKFxyXG4gICAgUE0yNUNvbmNlbnRyYXRpb24sXHJcbiAgICB1c2VyUmVzdGluZ1ZvbHVtZUJyZWF0aGVkXHJcbiAgKTtcclxuICAvLyAvL1xyXG5cclxuICAvLyBFeGVyY2lzZSBNYXNzIC8vXHJcbiAgY29uc3QgdXNlckV4ZXJjaXNlTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlckV4ZXJjaXNlSGVhcnRSYXRlKClcclxuICApO1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZVZvbHVtZUJyZWF0aGVkID0gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQoXHJcbiAgICB1c2VyRXhlcmNpc2VNaW51dGVWb2x1bWUsXHJcbiAgICBnZXRVc2VyRXhlcmNpc2VEdXJhdGlvbigpXHJcbiAgKTtcclxuICBjb25zdCB1c2VyRXhlcmNpc2VQTTI1TWFzcyA9IGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoXHJcbiAgICBQTTI1Q29uY2VudHJhdGlvbixcclxuICAgIHVzZXJFeGVyY2lzZVZvbHVtZUJyZWF0aGVkXHJcbiAgKTtcclxuICAvLyAvL1xyXG5cclxuICAvLyByb3VuZCByZXN1bHQgdG8gbmVhcmVzdCBpbnRlZ2VyXHJcbiAgY29uc3QgdXNlclJlc3RpbmdQTTI1TWFzc1JvdW5kZWQgPSBNYXRoLnJvdW5kKHVzZXJSZXN0aW5nUE0yNU1hc3MpO1xyXG4gIGNvbnN0IHVzZXJFeGVyY2lzZVBNMjVNYXNzUm91bmRlZCA9IE1hdGgucm91bmQodXNlckV4ZXJjaXNlUE0yNU1hc3MpO1xyXG4gIGNvbnN0IHRvdGFsUE0yNU1hc3MgPVxyXG4gICAgdXNlclJlc3RpbmdQTTI1TWFzc1JvdW5kZWQgKyB1c2VyRXhlcmNpc2VQTTI1TWFzc1JvdW5kZWQ7XHJcbiAgcmV0dXJuIHRvdGFsUE0yNU1hc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9DaWdhcmV0dGVQZXJjZW50YWdlKHBtMjUpIHtcclxuICAvLyBwbTI1IGNvbWVzIGluIGFzIG1pY3JvZ3JhbXMsIGEgY29tbW9uIGNpZ2FyZXR0ZSBoYXMgMTIsMDAwIG1pY3JvZ3JhbXMgb2YgUE0yLjVcclxuICAvLyBtdWxpdHBseSBidXQgMTAwIGZvciBwZXJjZW50YWdlIG9mIGEgY2lnYXJldHRlIGJyZWF0aGVkIGZvciB0aGUgZ2l2ZW4gUE0yLjUgbWFzc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnQgPSAocG0yNSAvIDEyMDAwKSAqIDEwMDtcclxuXHJcbiAgLy8gcm91bmQgcmVzdWx0IHRvIHR3byBkZWNpbWFsIHBsYWNlc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkID0gTnVtYmVyKGNpZ2FyZXR0ZVBlcmNlbnQudG9GaXhlZCgyKSk7XHJcbiAgcmV0dXJuIGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==