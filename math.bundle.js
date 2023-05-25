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
  const userPM25MassRounded = Math.round(userPM25Mass);
  return userPM25MassRounded;
}

function convertToCigarettePercentage(pm25) {
  // pm25 comes in as micrograms, a common cigarette has 12,000 micrograms of PM2.5
  // mulitply but 100 for percentage of a cigarette breathed for the given PM2.5 mass
  const cigarettePercent = (pm25 / 12000) * 100;
  const cigarettePercentRounded = Number(cigarettePercent.toFixed(2));
  return cigarettePercentRounded;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS8uL3NyYy9tYXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQVFJID0gQWlyIFF1YWxpdHkgSW5kZXhcclxuLy8gUE0yLjUgPSBQYXJ0aWN1bGF0ZSBNYXR0ZXIgMi41IG1pY3JvbWV0ZXIgcGFydGljbGVzXHJcbi8vIFZlID0gTWludXRlIFZlbnRpbGF0aW9uLCB0aGUgYW1vdW50IG9mIGFpciBicmVhdGhlZCB1c3VhbGx5IExpdGVycy9taW51dGVcclxuXHJcbi8vIFRPRE8gY29uc2lkZXIgd3JhcHBpbmcgbWFueSBleHBvcnRzIGludG8gb25lIGV4cG9ydGVkIGlpZmVcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoaGVhcnRSYXRlKSB7XHJcbiAgY29uc3QgbWludXRlVmVudGlsYXRpb24gPSBNYXRoLmV4cCgxLjE2MiArIDAuMDIxICogaGVhcnRSYXRlKTtcclxuXHJcbiAgLy8gY29udmVydCBzdGFuZGFyZCBMaXRlcnMvbWludXRlIHVuaXRzIHRvIG1eMy9taW51dGUgdG8gbWF0Y2ggd2l0aCBzdGFuZGFyZCBwbTIuNSBjb25jZW50cmF0aW9uIHVuaXRzXHJcbiAgY29uc3QgbWludXRlVmVudGlsYXRpb25NMyA9IG1pbnV0ZVZlbnRpbGF0aW9uIC8gMTAwMDtcclxuICByZXR1cm4gbWludXRlVmVudGlsYXRpb25NMztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShBUUkpIHtcclxuICBsZXQgSWg7XHJcbiAgbGV0IElsO1xyXG4gIGxldCBCUGg7XHJcbiAgbGV0IEJQbDtcclxuXHJcbiAgaWYgKEFRSSA+PSAwKSB7XHJcbiAgICBJaCA9IDUwO1xyXG4gICAgSWwgPSAwO1xyXG4gICAgQlBoID0gMTI7XHJcbiAgICBCUGwgPSAwO1xyXG4gIH1cclxuICBpZiAoQVFJID49IDUxKSB7XHJcbiAgICBJaCA9IDEwMDtcclxuICAgIElsID0gNTE7XHJcbiAgICBCUGggPSAzNS40O1xyXG4gICAgQlBsID0gMTIuMTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAxMDEpIHtcclxuICAgIEloID0gMTUwO1xyXG4gICAgSWwgPSAxMDE7XHJcbiAgICBCUGggPSA1NS40O1xyXG4gICAgQlBsID0gMzUuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAxNTEpIHtcclxuICAgIEloID0gMjAwO1xyXG4gICAgSWwgPSAxNTE7XHJcbiAgICBCUGggPSAxNTAuNDtcclxuICAgIEJQbCA9IDU1LjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gMjAxKSB7XHJcbiAgICBJaCA9IDMwMDtcclxuICAgIElsID0gMjAxO1xyXG4gICAgQlBoID0gMjUwLjQ7XHJcbiAgICBCUGwgPSAxNTAuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAzMDEpIHtcclxuICAgIEloID0gNDAwO1xyXG4gICAgSWwgPSAzMDE7XHJcbiAgICBCUGggPSAzNTAuNDtcclxuICAgIEJQbCA9IDI1MC41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDQwMSkge1xyXG4gICAgSWggPSA1MDA7XHJcbiAgICBJbCA9IDQwMTtcclxuICAgIEJQaCA9IDUwMC40O1xyXG4gICAgQlBsID0gMzUwLjU7XHJcbiAgfVxyXG5cclxuICAvLyBUT0RPIGZpbmlzaCBmaWxsaW5nIGluIGNvbnN0YW50cyBmb3IgZGlmZmVyZW50IEFRSSBsZXZlbHNcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIChBUUkgKyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpICogQlBsIC0gSWwpIC8gKChJaCAtIElsKSAvIChCUGggLSBCUGwpKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChtaW51dGVWZW50aWxhdGlvbiwgbWludXRlcykge1xyXG4gIC8vIHVuaXRzIGluIG1eMywgYmFzZWQgb24gbWludXRlIHZlbnRpbGF0aW9uIGZ1bmN0aW9uXHJcbiAgY29uc3Qgdm9sdW1lID0gbWludXRlVmVudGlsYXRpb24gKiBtaW51dGVzO1xyXG4gIHJldHVybiB2b2x1bWU7XHJcbn1cclxuXHJcbi8vIFRPRE8gbWFrZSBzdXJlIHVuaXRzIG1hdGNoIHdoZW4gY29taW5nIGluIGhlcmVcclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoY29uY2VudHJhdGlvbiwgdm9sdW1lKSB7XHJcbiAgY29uc3QgUE0yNU1hc3MgPSBjb25jZW50cmF0aW9uICogdm9sdW1lO1xyXG4gIHJldHVybiBQTTI1TWFzcztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJBUUkoKSB7XHJcbiAgY29uc3QgdXNlckFRSSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckFRSVwiKTtcclxuICByZXR1cm4gTnVtYmVyKHVzZXJBUUkudmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKSB7XHJcbiAgY29uc3QgdXNlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VySGVhcnRSYXRlXCIpO1xyXG4gIHJldHVybiBOdW1iZXIodXNlcklucHV0LnZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVVzZXJQTTI1TWFzcyhtaW51dGVzKSB7XHJcbiAgLy8gVE9ETyBjaGFuZ2UgdG8gdXNlciBkYXRhIGZ1bmN0aW9ucyBhZnRlciB0ZXN0aW5nXHJcbiAgLy8gZmluYWwgdW5pdCBpcyBpbiBtaWNyb2dyYW1zXHJcblxyXG4gIC8vIDE0NDAgbWludXRlcyBpbiBhIGRheVxyXG4gIGNvbnN0IHVzZXJNaW51dGVWb2x1bWUgPSBjYWxjdWxhdGVNaW51dGVWZW50aWxhdGlvbkZyb21IZWFydFJhdGUoXHJcbiAgICBnZXRVc2VyUmVzdGluZ0hlYXJ0UmF0ZSgpXHJcbiAgKTtcclxuICBjb25zdCB1c2VyVm9sdW1lQnJlYXRoZWQgPSBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChcclxuICAgIHVzZXJNaW51dGVWb2x1bWUsXHJcbiAgICBtaW51dGVzXHJcbiAgKTtcclxuICBjb25zdCBQTTI1Q29uY2VudHJhdGlvbiA9IFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShnZXRVc2VyQVFJKCkpO1xyXG4gIGNvbnN0IHVzZXJQTTI1TWFzcyA9IGNhbGN1bGF0ZVBNMjVNYXNzQnJlYXRoZWQoXHJcbiAgICBQTTI1Q29uY2VudHJhdGlvbixcclxuICAgIHVzZXJWb2x1bWVCcmVhdGhlZFxyXG4gICk7XHJcbiAgY29uc3QgdXNlclBNMjVNYXNzUm91bmRlZCA9IE1hdGgucm91bmQodXNlclBNMjVNYXNzKTtcclxuICByZXR1cm4gdXNlclBNMjVNYXNzUm91bmRlZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0NpZ2FyZXR0ZVBlcmNlbnRhZ2UocG0yNSkge1xyXG4gIC8vIHBtMjUgY29tZXMgaW4gYXMgbWljcm9ncmFtcywgYSBjb21tb24gY2lnYXJldHRlIGhhcyAxMiwwMDAgbWljcm9ncmFtcyBvZiBQTTIuNVxyXG4gIC8vIG11bGl0cGx5IGJ1dCAxMDAgZm9yIHBlcmNlbnRhZ2Ugb2YgYSBjaWdhcmV0dGUgYnJlYXRoZWQgZm9yIHRoZSBnaXZlbiBQTTIuNSBtYXNzXHJcbiAgY29uc3QgY2lnYXJldHRlUGVyY2VudCA9IChwbTI1IC8gMTIwMDApICogMTAwO1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkID0gTnVtYmVyKGNpZ2FyZXR0ZVBlcmNlbnQudG9GaXhlZCgyKSk7XHJcbiAgcmV0dXJuIGNpZ2FyZXR0ZVBlcmNlbnRSb3VuZGVkO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==