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
  const minuteVentilation = Math.exp(1.162 + 0.021 * heartRate);

  // convert standard Liters/minute units to m^3/minute to match with standard pm2.5 concentration units
  const minuteVentilationM3 = minuteVentilation / 1000;
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

// Resting //
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

// Exercise //
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

  // 1440 minutes in a day
  const userRestingMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserRestingHeartRate()
  );
  const userRestingVolumeBreathed = calculateVolumeAirBreathed(
    userRestingMinuteVolume,
    calculateTotalExposureTime()
  );
  const PM25Concentration = PM25ConcentrationFromAQI(getUserAQI());
  const userRestingPM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userRestingVolumeBreathed
  );

  // round result to nearest integer
  const userRestingPM25MassRounded = Math.round(userRestingPM25Mass);
  return userRestingPM25MassRounded;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvLi9zcmMvbWF0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEFRSSA9IEFpciBRdWFsaXR5IEluZGV4XHJcbi8vIFBNMi41ID0gUGFydGljdWxhdGUgTWF0dGVyIDIuNSBtaWNyb21ldGVyIHBhcnRpY2xlc1xyXG4vLyBWZSA9IE1pbnV0ZSBWZW50aWxhdGlvbiwgdGhlIGFtb3VudCBvZiBhaXIgYnJlYXRoZWQgdXN1YWxseSBMaXRlcnMvbWludXRlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKGhlYXJ0UmF0ZSkge1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uID0gTWF0aC5leHAoMS4xNjIgKyAwLjAyMSAqIGhlYXJ0UmF0ZSk7XHJcblxyXG4gIC8vIGNvbnZlcnQgc3RhbmRhcmQgTGl0ZXJzL21pbnV0ZSB1bml0cyB0byBtXjMvbWludXRlIHRvIG1hdGNoIHdpdGggc3RhbmRhcmQgcG0yLjUgY29uY2VudHJhdGlvbiB1bml0c1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uTTMgPSBtaW51dGVWZW50aWxhdGlvbiAvIDEwMDA7XHJcbiAgcmV0dXJuIG1pbnV0ZVZlbnRpbGF0aW9uTTM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoQVFJKSB7XHJcbiAgbGV0IEloO1xyXG4gIGxldCBJbDtcclxuICBsZXQgQlBoO1xyXG4gIGxldCBCUGw7XHJcblxyXG4gIGlmIChBUUkgPj0gMCkge1xyXG4gICAgSWggPSA1MDtcclxuICAgIElsID0gMDtcclxuICAgIEJQaCA9IDEyO1xyXG4gICAgQlBsID0gMDtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA1MSkge1xyXG4gICAgSWggPSAxMDA7XHJcbiAgICBJbCA9IDUxO1xyXG4gICAgQlBoID0gMzUuNDtcclxuICAgIEJQbCA9IDEyLjE7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTAxKSB7XHJcbiAgICBJaCA9IDE1MDtcclxuICAgIElsID0gMTAxO1xyXG4gICAgQlBoID0gNTUuNDtcclxuICAgIEJQbCA9IDM1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTUxKSB7XHJcbiAgICBJaCA9IDIwMDtcclxuICAgIElsID0gMTUxO1xyXG4gICAgQlBoID0gMTUwLjQ7XHJcbiAgICBCUGwgPSA1NS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDIwMSkge1xyXG4gICAgSWggPSAzMDA7XHJcbiAgICBJbCA9IDIwMTtcclxuICAgIEJQaCA9IDI1MC40O1xyXG4gICAgQlBsID0gMTUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMzAxKSB7XHJcbiAgICBJaCA9IDQwMDtcclxuICAgIElsID0gMzAxO1xyXG4gICAgQlBoID0gMzUwLjQ7XHJcbiAgICBCUGwgPSAyNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA0MDEpIHtcclxuICAgIEloID0gNTAwO1xyXG4gICAgSWwgPSA0MDE7XHJcbiAgICBCUGggPSA1MDAuNDtcclxuICAgIEJQbCA9IDM1MC41O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIChBUUkgKyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpICogQlBsIC0gSWwpIC8gKChJaCAtIElsKSAvIChCUGggLSBCUGwpKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChtaW51dGVWZW50aWxhdGlvbiwgbWludXRlcykge1xyXG4gIC8vIHVuaXRzIGluIG1eMywgYmFzZWQgb24gbWludXRlIHZlbnRpbGF0aW9uIGZ1bmN0aW9uXHJcbiAgY29uc3Qgdm9sdW1lID0gbWludXRlVmVudGlsYXRpb24gKiBtaW51dGVzO1xyXG4gIHJldHVybiB2b2x1bWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKGNvbmNlbnRyYXRpb24sIHZvbHVtZSkge1xyXG4gIGNvbnN0IFBNMjVNYXNzID0gY29uY2VudHJhdGlvbiAqIHZvbHVtZTtcclxuICByZXR1cm4gUE0yNU1hc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQVFJKCkge1xyXG4gIGNvbnN0IHVzZXJBUUkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJBUUlcIik7XHJcbiAgcmV0dXJuIE51bWJlcih1c2VyQVFJLnZhbHVlKTtcclxufVxyXG5cclxuLy8gUmVzdGluZyAvL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKSB7XHJcbiAgY29uc3QgdXNlckhlYXJ0UmF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckhlYXJ0UmF0ZVwiKTtcclxuICByZXR1cm4gTnVtYmVyKHVzZXJIZWFydFJhdGUudmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlclJlc3RpbmdEdXJhdGlvbigpIHtcclxuICBsZXQgZHVyYXRpb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJSZXN0aW5nRHVyYXRpb25cIik7XHJcbiAgLy8gY29udmVydCBpbnB1dCBmcm9tIGhvdXJzIHRvIG1pbnV0ZXNcclxuICBkdXJhdGlvbiA9IE51bWJlcihkdXJhdGlvbi52YWx1ZSAqIDYwKTtcclxuICByZXR1cm4gZHVyYXRpb247XHJcbn1cclxuLy8gLy9cclxuXHJcbi8vIEV4ZXJjaXNlIC8vXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyRXhlcmNpc2VIZWFydFJhdGUoKSB7XHJcbiAgY29uc3QgZXhlcmNpc2VIZWFydFJhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJFeGVyY2lzZUhlYXJ0UmF0ZVwiKTtcclxuICByZXR1cm4gTnVtYmVyKGV4ZXJjaXNlSGVhcnRSYXRlLnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJFeGVyY2lzZUR1cmF0aW9uKCkge1xyXG4gIGNvbnN0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyRXhlcmNpc2VEdXJhdGlvblwiKTtcclxuICByZXR1cm4gTnVtYmVyKGR1cmF0aW9uLnZhbHVlKTtcclxufVxyXG4vLyAvL1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVRvdGFsRXhwb3N1cmVUaW1lKCkge1xyXG4gIGNvbnN0IHJlc3RUaW1lID0gZ2V0VXNlclJlc3RpbmdEdXJhdGlvbigpO1xyXG4gIGNvbnN0IGV4ZXJjaXNlVGltZSA9IGdldFVzZXJFeGVyY2lzZUR1cmF0aW9uKCk7XHJcbiAgY29uc3QgdG90YWxUaW1lID0gcmVzdFRpbWUgKyBleGVyY2lzZVRpbWU7XHJcblxyXG4gIHJldHVybiB0b3RhbFRpbWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVVc2VyUE0yNU1hc3MoKSB7XHJcbiAgLy8gZmluYWwgdW5pdCBpcyBpbiBtaWNyb2dyYW1zXHJcblxyXG4gIC8vIDE0NDAgbWludXRlcyBpbiBhIGRheVxyXG4gIGNvbnN0IHVzZXJSZXN0aW5nTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKVxyXG4gICk7XHJcbiAgY29uc3QgdXNlclJlc3RpbmdWb2x1bWVCcmVhdGhlZCA9IGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKFxyXG4gICAgdXNlclJlc3RpbmdNaW51dGVWb2x1bWUsXHJcbiAgICBjYWxjdWxhdGVUb3RhbEV4cG9zdXJlVGltZSgpXHJcbiAgKTtcclxuICBjb25zdCBQTTI1Q29uY2VudHJhdGlvbiA9IFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShnZXRVc2VyQVFJKCkpO1xyXG4gIGNvbnN0IHVzZXJSZXN0aW5nUE0yNU1hc3MgPSBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKFxyXG4gICAgUE0yNUNvbmNlbnRyYXRpb24sXHJcbiAgICB1c2VyUmVzdGluZ1ZvbHVtZUJyZWF0aGVkXHJcbiAgKTtcclxuXHJcbiAgLy8gcm91bmQgcmVzdWx0IHRvIG5lYXJlc3QgaW50ZWdlclxyXG4gIGNvbnN0IHVzZXJSZXN0aW5nUE0yNU1hc3NSb3VuZGVkID0gTWF0aC5yb3VuZCh1c2VyUmVzdGluZ1BNMjVNYXNzKTtcclxuICByZXR1cm4gdXNlclJlc3RpbmdQTTI1TWFzc1JvdW5kZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9DaWdhcmV0dGVQZXJjZW50YWdlKHBtMjUpIHtcclxuICAvLyBwbTI1IGNvbWVzIGluIGFzIG1pY3JvZ3JhbXMsIGEgY29tbW9uIGNpZ2FyZXR0ZSBoYXMgMTIsMDAwIG1pY3JvZ3JhbXMgb2YgUE0yLjVcclxuICAvLyBtdWxpdHBseSBidXQgMTAwIGZvciBwZXJjZW50YWdlIG9mIGEgY2lnYXJldHRlIGJyZWF0aGVkIGZvciB0aGUgZ2l2ZW4gUE0yLjUgbWFzc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnQgPSAocG0yNSAvIDEyMDAwKSAqIDEwMDtcclxuXHJcbiAgLy8gcm91bmQgcmVzdWx0IHRvIHR3byBkZWNpbWFsIHBsYWNlc1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkID0gTnVtYmVyKGNpZ2FyZXR0ZVBlcmNlbnQudG9GaXhlZCgyKSk7XHJcbiAgcmV0dXJuIGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==