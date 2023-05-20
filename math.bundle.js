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
/* harmony export */   "calculateMinuteVolumeFromHeartRate": () => (/* binding */ calculateMinuteVolumeFromHeartRate),
/* harmony export */   "calculatePM25MassBreathed": () => (/* binding */ calculatePM25MassBreathed),
/* harmony export */   "calculateVolumeAirBreathed": () => (/* binding */ calculateVolumeAirBreathed),
/* harmony export */   "getUserHeartRate": () => (/* binding */ getUserHeartRate)
/* harmony export */ });
// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
// Ve = Minute Ventilation, the amount of air breathed usually Liters/minute

// TODO consider wrapping many exports into one exported iife

function calculateMinuteVolumeFromHeartRate(heartrate) {
  const minuteVentilation = Math.exp(1.162 + 0.021 * heartrate);
  return minuteVentilation;
}

function PM25ConcentrationFromAQI(AQI) {
  let Ih;
  let Il;
  let BPh;
  let BPl;

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
  const volume = minuteVentilation * minutes;
  return volume;
}

// TODO make sure units match when coming in here
function calculatePM25MassBreathed(concentration, volume) {
  const PM25Mass = concentration * volume;
  return PM25Mass;
}

function getUserHeartRate() {
  const userInput = document.getElementById("userHeartRate");
  return userInput.value;
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvLi9zcmMvbWF0aC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIEFRSSA9IEFpciBRdWFsaXR5IEluZGV4XHJcbi8vIFBNMi41ID0gUGFydGljdWxhdGUgTWF0dGVyIDIuNSBtaWNyb21ldGVyIHBhcnRpY2xlc1xyXG4vLyBWZSA9IE1pbnV0ZSBWZW50aWxhdGlvbiwgdGhlIGFtb3VudCBvZiBhaXIgYnJlYXRoZWQgdXN1YWxseSBMaXRlcnMvbWludXRlXHJcblxyXG4vLyBUT0RPIGNvbnNpZGVyIHdyYXBwaW5nIG1hbnkgZXhwb3J0cyBpbnRvIG9uZSBleHBvcnRlZCBpaWZlXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlTWludXRlVm9sdW1lRnJvbUhlYXJ0UmF0ZShoZWFydHJhdGUpIHtcclxuICBjb25zdCBtaW51dGVWZW50aWxhdGlvbiA9IE1hdGguZXhwKDEuMTYyICsgMC4wMjEgKiBoZWFydHJhdGUpO1xyXG4gIHJldHVybiBtaW51dGVWZW50aWxhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBNMjVDb25jZW50cmF0aW9uRnJvbUFRSShBUUkpIHtcclxuICBsZXQgSWg7XHJcbiAgbGV0IElsO1xyXG4gIGxldCBCUGg7XHJcbiAgbGV0IEJQbDtcclxuXHJcbiAgaWYgKEFRSSA+PSA0MDEpIHtcclxuICAgIEloID0gNTAwO1xyXG4gICAgSWwgPSA0MDE7XHJcbiAgICBCUGggPSA1MDAuNDtcclxuICAgIEJQbCA9IDM1MC41O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIChBUUkgKyAoKEloIC0gSWwpIC8gKEJQaCAtIEJQbCkpICogQlBsIC0gSWwpIC8gKChJaCAtIElsKSAvIChCUGggLSBCUGwpKVxyXG4gICk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVWb2x1bWVBaXJCcmVhdGhlZChtaW51dGVWZW50aWxhdGlvbiwgbWludXRlcykge1xyXG4gIGNvbnN0IHZvbHVtZSA9IG1pbnV0ZVZlbnRpbGF0aW9uICogbWludXRlcztcclxuICByZXR1cm4gdm9sdW1lO1xyXG59XHJcblxyXG4vLyBUT0RPIG1ha2Ugc3VyZSB1bml0cyBtYXRjaCB3aGVuIGNvbWluZyBpbiBoZXJlXHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQTTI1TWFzc0JyZWF0aGVkKGNvbmNlbnRyYXRpb24sIHZvbHVtZSkge1xyXG4gIGNvbnN0IFBNMjVNYXNzID0gY29uY2VudHJhdGlvbiAqIHZvbHVtZTtcclxuICByZXR1cm4gUE0yNU1hc3M7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRVc2VySGVhcnRSYXRlKCkge1xyXG4gIGNvbnN0IHVzZXJJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlckhlYXJ0UmF0ZVwiKTtcclxuICByZXR1cm4gdXNlcklucHV0LnZhbHVlO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==