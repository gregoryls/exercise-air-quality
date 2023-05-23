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
  return userAQI.value;
}

function getUserRestingHeartRate() {
  const userInput = document.getElementById("userHeartRate");
  return userInput.value;
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
  return userPM25Mass;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5Ly4vc3JjL21hdGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBBUUkgPSBBaXIgUXVhbGl0eSBJbmRleFxyXG4vLyBQTTIuNSA9IFBhcnRpY3VsYXRlIE1hdHRlciAyLjUgbWljcm9tZXRlciBwYXJ0aWNsZXNcclxuLy8gVmUgPSBNaW51dGUgVmVudGlsYXRpb24sIHRoZSBhbW91bnQgb2YgYWlyIGJyZWF0aGVkIHVzdWFsbHkgTGl0ZXJzL21pbnV0ZVxyXG5cclxuLy8gVE9ETyBjb25zaWRlciB3cmFwcGluZyBtYW55IGV4cG9ydHMgaW50byBvbmUgZXhwb3J0ZWQgaWlmZVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZU1pbnV0ZVZlbnRpbGF0aW9uRnJvbUhlYXJ0UmF0ZShoZWFydFJhdGUpIHtcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbiA9IE1hdGguZXhwKDEuMTYyICsgMC4wMjEgKiBoZWFydFJhdGUpO1xyXG5cclxuICAvLyBjb252ZXJ0IHN0YW5kYXJkIExpdGVycy9taW51dGUgdW5pdHMgdG8gbV4zL21pbnV0ZSB0byBtYXRjaCB3aXRoIHN0YW5kYXJkIHBtMi41IGNvbmNlbnRyYXRpb24gdW5pdHNcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbk0zID0gbWludXRlVmVudGlsYXRpb24gLyAxMDAwO1xyXG4gIHJldHVybiBtaW51dGVWZW50aWxhdGlvbk0zO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUE0yNUNvbmNlbnRyYXRpb25Gcm9tQVFJKEFRSSkge1xyXG4gIGxldCBJaDtcclxuICBsZXQgSWw7XHJcbiAgbGV0IEJQaDtcclxuICBsZXQgQlBsO1xyXG5cclxuICBpZiAoQVFJID49IDApIHtcclxuICAgIEloID0gNTA7XHJcbiAgICBJbCA9IDA7XHJcbiAgICBCUGggPSAxMjtcclxuICAgIEJQbCA9IDA7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gNTEpIHtcclxuICAgIEloID0gMTAwO1xyXG4gICAgSWwgPSA1MTtcclxuICAgIEJQaCA9IDM1LjQ7XHJcbiAgICBCUGwgPSAxMi4xO1xyXG4gIH1cclxuICBpZiAoQVFJID49IDEwMSkge1xyXG4gICAgSWggPSAxNTA7XHJcbiAgICBJbCA9IDEwMTtcclxuICAgIEJQaCA9IDU1LjQ7XHJcbiAgICBCUGwgPSAzNS41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDE1MSkge1xyXG4gICAgSWggPSAyMDA7XHJcbiAgICBJbCA9IDE1MTtcclxuICAgIEJQaCA9IDE1MC40O1xyXG4gICAgQlBsID0gNTUuNTtcclxuICB9XHJcbiAgaWYgKEFRSSA+PSAyMDEpIHtcclxuICAgIEloID0gMzAwO1xyXG4gICAgSWwgPSAyMDE7XHJcbiAgICBCUGggPSAyNTAuNDtcclxuICAgIEJQbCA9IDE1MC41O1xyXG4gIH1cclxuICBpZiAoQVFJID49IDMwMSkge1xyXG4gICAgSWggPSA0MDA7XHJcbiAgICBJbCA9IDMwMTtcclxuICAgIEJQaCA9IDM1MC40O1xyXG4gICAgQlBsID0gMjUwLjU7XHJcbiAgfVxyXG4gIGlmIChBUUkgPj0gNDAxKSB7XHJcbiAgICBJaCA9IDUwMDtcclxuICAgIElsID0gNDAxO1xyXG4gICAgQlBoID0gNTAwLjQ7XHJcbiAgICBCUGwgPSAzNTAuNTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE8gZmluaXNoIGZpbGxpbmcgaW4gY29uc3RhbnRzIGZvciBkaWZmZXJlbnQgQVFJIGxldmVsc1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgKEFRSSArICgoSWggLSBJbCkgLyAoQlBoIC0gQlBsKSkgKiBCUGwgLSBJbCkgLyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpXHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVZvbHVtZUFpckJyZWF0aGVkKG1pbnV0ZVZlbnRpbGF0aW9uLCBtaW51dGVzKSB7XHJcbiAgLy8gdW5pdHMgaW4gbV4zLCBiYXNlZCBvbiBtaW51dGUgdmVudGlsYXRpb24gZnVuY3Rpb25cclxuICBjb25zdCB2b2x1bWUgPSBtaW51dGVWZW50aWxhdGlvbiAqIG1pbnV0ZXM7XHJcbiAgcmV0dXJuIHZvbHVtZTtcclxufVxyXG5cclxuLy8gVE9ETyBtYWtlIHN1cmUgdW5pdHMgbWF0Y2ggd2hlbiBjb21pbmcgaW4gaGVyZVxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChjb25jZW50cmF0aW9uLCB2b2x1bWUpIHtcclxuICBjb25zdCBQTTI1TWFzcyA9IGNvbmNlbnRyYXRpb24gKiB2b2x1bWU7XHJcbiAgcmV0dXJuIFBNMjVNYXNzO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlckFRSSgpIHtcclxuICBjb25zdCB1c2VyQVFJID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VyQVFJXCIpO1xyXG4gIHJldHVybiB1c2VyQVFJLnZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKSB7XHJcbiAgY29uc3QgdXNlcklucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1c2VySGVhcnRSYXRlXCIpO1xyXG4gIHJldHVybiB1c2VySW5wdXQudmFsdWU7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVVc2VyUE0yNU1hc3MobWludXRlcykge1xyXG4gIC8vIFRPRE8gY2hhbmdlIHRvIHVzZXIgZGF0YSBmdW5jdGlvbnMgYWZ0ZXIgdGVzdGluZ1xyXG4gIC8vIGZpbmFsIHVuaXQgaXMgaW4gbWljcm9ncmFtc1xyXG5cclxuICAvLyAxNDQwIG1pbnV0ZXMgaW4gYSBkYXlcclxuICBjb25zdCB1c2VyTWludXRlVm9sdW1lID0gY2FsY3VsYXRlTWludXRlVmVudGlsYXRpb25Gcm9tSGVhcnRSYXRlKFxyXG4gICAgZ2V0VXNlclJlc3RpbmdIZWFydFJhdGUoKVxyXG4gICk7XHJcbiAgY29uc3QgdXNlclZvbHVtZUJyZWF0aGVkID0gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQoXHJcbiAgICB1c2VyTWludXRlVm9sdW1lLFxyXG4gICAgbWludXRlc1xyXG4gICk7XHJcbiAgY29uc3QgUE0yNUNvbmNlbnRyYXRpb24gPSBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoZ2V0VXNlckFRSSgpKTtcclxuICBjb25zdCB1c2VyUE0yNU1hc3MgPSBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKFxyXG4gICAgUE0yNUNvbmNlbnRyYXRpb24sXHJcbiAgICB1c2VyVm9sdW1lQnJlYXRoZWRcclxuICApO1xyXG4gIHJldHVybiB1c2VyUE0yNU1hc3M7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9