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
/* harmony export */   "calculateUserPM25Mass": () => (/* binding */ calculateUserPM25Mass),
/* harmony export */   "calculateVolumeAirBreathed": () => (/* binding */ calculateVolumeAirBreathed),
/* harmony export */   "convertToCigarettePercentage": () => (/* binding */ convertToCigarettePercentage),
/* harmony export */   "getUserAQI": () => (/* binding */ getUserAQI),
/* harmony export */   "getUserExerciseDuration": () => (/* binding */ getUserExerciseDuration),
/* harmony export */   "getUserRestingDuration": () => (/* binding */ getUserRestingDuration),
/* harmony export */   "getUserRestingHeartRate": () => (/* binding */ getUserRestingHeartRate)
/* harmony export */ });
// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
// Ve = Minute Ventilation, the amount of air breathed usually Liters/minute

// TODO consider wrapping many exports into one exported iife

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

  // TODO finish filling in constants for different AQI levels

  return (
    (AQI + ((Ih - Il) / (BPh - BPl)) * BPl - Il) / ((Ih - Il) / (BPh - BPl))
  );
}

function calculateVolumeAirBreathed(minuteVentilation, minutes) {
  // units in m^3, based on minute ventilation function
  const volume = minuteVentilation * minutes;
  return volume;
}

// TODO make sure units match when coming in here
function calculatePM25MassBreathed(concentration, volume) {
  const PM25Mass = concentration * volume;
  return PM25Mass;
}

function getUserAQI() {
  const userAQI = document.getElementById("userAQI");
  return Number(userAQI.value);
}

function getUserRestingHeartRate() {
  const userInput = document.getElementById("userHeartRate");
  return Number(userInput.value);
}

function getUserRestingDuration() {
  let duration = document.getElementById("userRestingDuration");
  // convert input from hours to minutes
  duration = Number(duration.value * 60);
  return duration;
}

function getUserExerciseDuration() {
  const duration = document.getElementById("userExerciseDuration");
  return Number(duration.value);
}

function calculateUserPM25Mass(minutes) {
  // TODO change to user data functions after testing
  // final unit is in micrograms

  // 1440 minutes in a day
  const userMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserRestingHeartRate()
  );
  const userVolumeBreathed = calculateVolumeAirBreathed(
    userMinuteVolume,
    minutes
  );
  const PM25Concentration = PM25ConcentrationFromAQI(getUserAQI());
  const userPM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userVolumeBreathed
  );

  // round result to nearest integer
  const userPM25MassRounded = Math.round(userPM25Mass);
  return userPM25MassRounded;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvLi9zcmMvbWF0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEFRSSA9IEFpciBRdWFsaXR5IEluZGV4XHJcbi8vIFBNMi41ID0gUGFydGljdWxhdGUgTWF0dGVyIDIuNSBtaWNyb21ldGVyIHBhcnRpY2xlc1xyXG4vLyBWZSA9IE1pbnV0ZSBWZW50aWxhdGlvbiwgdGhlIGFtb3VudCBvZiBhaXIgYnJlYXRoZWQgdXN1YWxseSBMaXRlcnMvbWludXRlXHJcblxyXG4vLyBUT0RPIGNvbnNpZGVyIHdyYXBwaW5nIG1hbnkgZXhwb3J0cyBpbnRvIG9uZSBleHBvcnRlZCBpaWZlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKGhlYXJ0UmF0ZSkge1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uID0gTWF0aC5leHAoMS4xNjIgKyAwLjAyMSAqIGhlYXJ0UmF0ZSk7XHJcblxyXG4gIC8vIGNvbnZlcnQgc3RhbmRhcmQgTGl0ZXJzL21pbnV0ZSB1bml0cyB0byBtXjMvbWludXRlIHRvIG1hdGNoIHdpdGggc3RhbmRhcmQgcG0yLjUgY29uY2VudHJhdGlvbiB1bml0c1xyXG4gIGNvbnN0IG1pbnV0ZVZlbnRpbGF0aW9uTTMgPSBtaW51dGVWZW50aWxhdGlvbiAvIDEwMDA7XHJcbiAgcmV0dXJuIG1pbnV0ZVZlbnRpbGF0aW9uTTM7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoQVFJKSB7XHJcbiAgbGV0IEloO1xyXG4gIGxldCBJbDtcclxuICBsZXQgQlBoO1xyXG4gIGxldCBCUGw7XHJcblxyXG4gIGlmIChBUUkgPj0gMCkge1xyXG4gICAgSWggPSA1MDtcclxuICAgIElsID0gMDtcclxuICAgIEJQaCA9IDEyO1xyXG4gICAgQlBsID0gMDtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA1MSkge1xyXG4gICAgSWggPSAxMDA7XHJcbiAgICBJbCA9IDUxO1xyXG4gICAgQlBoID0gMzUuNDtcclxuICAgIEJQbCA9IDEyLjE7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTAxKSB7XHJcbiAgICBJaCA9IDE1MDtcclxuICAgIElsID0gMTAxO1xyXG4gICAgQlBoID0gNTUuNDtcclxuICAgIEJQbCA9IDM1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMTUxKSB7XHJcbiAgICBJaCA9IDIwMDtcclxuICAgIElsID0gMTUxO1xyXG4gICAgQlBoID0gMTUwLjQ7XHJcbiAgICBCUGwgPSA1NS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDIwMSkge1xyXG4gICAgSWggPSAzMDA7XHJcbiAgICBJbCA9IDIwMTtcclxuICAgIEJQaCA9IDI1MC40O1xyXG4gICAgQlBsID0gMTUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMzAxKSB7XHJcbiAgICBJaCA9IDQwMDtcclxuICAgIElsID0gMzAxO1xyXG4gICAgQlBoID0gMzUwLjQ7XHJcbiAgICBCUGwgPSAyNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSA0MDEpIHtcclxuICAgIEloID0gNTAwO1xyXG4gICAgSWwgPSA0MDE7XHJcbiAgICBCUGggPSA1MDAuNDtcclxuICAgIEJQbCA9IDM1MC41O1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ETyBmaW5pc2ggZmlsbGluZyBpbiBjb25zdGFudHMgZm9yIGRpZmZlcmVudCBBUUkgbGV2ZWxzXHJcblxyXG4gIHJldHVybiAoXHJcbiAgICAoQVFJICsgKChJaCAtIElsKSAvIChCUGggLSBCUGwpKSAqIEJQbCAtIElsKSAvICgoSWggLSBJbCkgLyAoQlBoIC0gQlBsKSlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQobWludXRlVmVudGlsYXRpb24sIG1pbnV0ZXMpIHtcclxuICAvLyB1bml0cyBpbiBtXjMsIGJhc2VkIG9uIG1pbnV0ZSB2ZW50aWxhdGlvbiBmdW5jdGlvblxyXG4gIGNvbnN0IHZvbHVtZSA9IG1pbnV0ZVZlbnRpbGF0aW9uICogbWludXRlcztcclxuICByZXR1cm4gdm9sdW1lO1xyXG59XHJcblxyXG4vLyBUT0RPIG1ha2Ugc3VyZSB1bml0cyBtYXRjaCB3aGVuIGNvbWluZyBpbiBoZXJlXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKGNvbmNlbnRyYXRpb24sIHZvbHVtZSkge1xyXG4gIGNvbnN0IFBNMjVNYXNzID0gY29uY2VudHJhdGlvbiAqIHZvbHVtZTtcclxuICByZXR1cm4gUE0yNU1hc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyQVFJKCkge1xyXG4gIGNvbnN0IHVzZXJBUUkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJBUUlcIik7XHJcbiAgcmV0dXJuIE51bWJlcih1c2VyQVFJLnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJSZXN0aW5nSGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IHVzZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckhlYXJ0UmF0ZVwiKTtcclxuICByZXR1cm4gTnVtYmVyKHVzZXJJbnB1dC52YWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VyUmVzdGluZ0R1cmF0aW9uKCkge1xyXG4gIGxldCBkdXJhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlclJlc3RpbmdEdXJhdGlvblwiKTtcclxuICAvLyBjb252ZXJ0IGlucHV0IGZyb20gaG91cnMgdG8gbWludXRlc1xyXG4gIGR1cmF0aW9uID0gTnVtYmVyKGR1cmF0aW9uLnZhbHVlICogNjApO1xyXG4gIHJldHVybiBkdXJhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJFeGVyY2lzZUR1cmF0aW9uKCkge1xyXG4gIGNvbnN0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyRXhlcmNpc2VEdXJhdGlvblwiKTtcclxuICByZXR1cm4gTnVtYmVyKGR1cmF0aW9uLnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVVzZXJQTTI1TWFzcyhtaW51dGVzKSB7XHJcbiAgLy8gVE9ETyBjaGFuZ2UgdG8gdXNlciBkYXRhIGZ1bmN0aW9ucyBhZnRlciB0ZXN0aW5nXHJcbiAgLy8gZmluYWwgdW5pdCBpcyBpbiBtaWNyb2dyYW1zXHJcblxyXG4gIC8vIDE0NDAgbWludXRlcyBpbiBhIGRheVxyXG4gIGNvbnN0IHVzZXJNaW51dGVWb2x1bWUgPSBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoXHJcbiAgICBnZXRVc2VyUmVzdGluZ0hlYXJ0UmF0ZSgpXHJcbiAgKTtcclxuICBjb25zdCB1c2VyVm9sdW1lQnJlYXRoZWQgPSBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChcclxuICAgIHVzZXJNaW51dGVWb2x1bWUsXHJcbiAgICBtaW51dGVzXHJcbiAgKTtcclxuICBjb25zdCBQTTI1Q29uY2VudHJhdGlvbiA9IFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShnZXRVc2VyQVFJKCkpO1xyXG4gIGNvbnN0IHVzZXJQTTI1TWFzcyA9IGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoXHJcbiAgICBQTTI1Q29uY2VudHJhdGlvbixcclxuICAgIHVzZXJWb2x1bWVCcmVhdGhlZFxyXG4gICk7XHJcblxyXG4gIC8vIHJvdW5kIHJlc3VsdCB0byBuZWFyZXN0IGludGVnZXJcclxuICBjb25zdCB1c2VyUE0yNU1hc3NSb3VuZGVkID0gTWF0aC5yb3VuZCh1c2VyUE0yNU1hc3MpO1xyXG4gIHJldHVybiB1c2VyUE0yNU1hc3NSb3VuZGVkO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvQ2lnYXJldHRlUGVyY2VudGFnZShwbTI1KSB7XHJcbiAgLy8gcG0yNSBjb21lcyBpbiBhcyBtaWNyb2dyYW1zLCBhIGNvbW1vbiBjaWdhcmV0dGUgaGFzIDEyLDAwMCBtaWNyb2dyYW1zIG9mIFBNMi41XHJcbiAgLy8gbXVsaXRwbHkgYnV0IDEwMCBmb3IgcGVyY2VudGFnZSBvZiBhIGNpZ2FyZXR0ZSBicmVhdGhlZCBmb3IgdGhlIGdpdmVuIFBNMi41IG1hc3NcclxuICBjb25zdCBjaWdhcmV0dGVQZXJjZW50ID0gKHBtMjUgLyAxMjAwMCkgKiAxMDA7XHJcblxyXG4gIC8vIHJvdW5kIHJlc3VsdCB0byB0d28gZGVjaW1hbCBwbGFjZXNcclxuICBjb25zdCBjaWdhcmV0dGVQZXJjZW50Um91bmRlZCA9IE51bWJlcihjaWdhcmV0dGVQZXJjZW50LnRvRml4ZWQoMikpO1xyXG4gIHJldHVybiBjaWdhcmV0dGVQZXJjZW50Um91bmRlZDtcclxufVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=