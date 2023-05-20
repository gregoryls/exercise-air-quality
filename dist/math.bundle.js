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
/* harmony export */   "calculatePM25MassBreathed": () => (/* binding */ calculatePM25MassBreathed),
/* harmony export */   "calculateVolumeAirBreathed": () => (/* binding */ calculateVolumeAirBreathed),
/* harmony export */   "default": () => (/* binding */ calculateMinuteVolumeFromHeartRate)
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

// export function getUserHeartRate() {
//   const userInput = document.getElementById("userHeartRate");
//   return userInput.value;
// }

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7VUFBQTtVQUNBOzs7OztXQ0RBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS8uL3NyYy9tYXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gQVFJID0gQWlyIFF1YWxpdHkgSW5kZXhcclxuLy8gUE0yLjUgPSBQYXJ0aWN1bGF0ZSBNYXR0ZXIgMi41IG1pY3JvbWV0ZXIgcGFydGljbGVzXHJcbi8vIFZlID0gTWludXRlIFZlbnRpbGF0aW9uLCB0aGUgYW1vdW50IG9mIGFpciBicmVhdGhlZCB1c3VhbGx5IExpdGVycy9taW51dGVcclxuXHJcbi8vIFRPRE8gY29uc2lkZXIgd3JhcHBpbmcgbWFueSBleHBvcnRzIGludG8gb25lIGV4cG9ydGVkIGlpZmVcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNhbGN1bGF0ZU1pbnV0ZVZvbHVtZUZyb21IZWFydFJhdGUoaGVhcnRyYXRlKSB7XHJcbiAgY29uc3QgbWludXRlVmVudGlsYXRpb24gPSBNYXRoLmV4cCgxLjE2MiArIDAuMDIxICogaGVhcnRyYXRlKTtcclxuICByZXR1cm4gbWludXRlVmVudGlsYXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQTTI1Q29uY2VudHJhdGlvbkZyb21BUUkoQVFJKSB7XHJcbiAgbGV0IEloO1xyXG4gIGxldCBJbDtcclxuICBsZXQgQlBoO1xyXG4gIGxldCBCUGw7XHJcblxyXG4gIGlmIChBUUkgPj0gNDAxKSB7XHJcbiAgICBJaCA9IDUwMDtcclxuICAgIElsID0gNDAxO1xyXG4gICAgQlBoID0gNTAwLjQ7XHJcbiAgICBCUGwgPSAzNTAuNTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICAoQVFJICsgKChJaCAtIElsKSAvIChCUGggLSBCUGwpKSAqIEJQbCAtIElsKSAvICgoSWggLSBJbCkgLyAoQlBoIC0gQlBsKSlcclxuICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlVm9sdW1lQWlyQnJlYXRoZWQobWludXRlVmVudGlsYXRpb24sIG1pbnV0ZXMpIHtcclxuICBjb25zdCB2b2x1bWUgPSBtaW51dGVWZW50aWxhdGlvbiAqIG1pbnV0ZXM7XHJcbiAgcmV0dXJuIHZvbHVtZTtcclxufVxyXG5cclxuLy8gVE9ETyBtYWtlIHN1cmUgdW5pdHMgbWF0Y2ggd2hlbiBjb21pbmcgaW4gaGVyZVxyXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUE0yNU1hc3NCcmVhdGhlZChjb25jZW50cmF0aW9uLCB2b2x1bWUpIHtcclxuICBjb25zdCBQTTI1TWFzcyA9IGNvbmNlbnRyYXRpb24gKiB2b2x1bWU7XHJcbiAgcmV0dXJuIFBNMjVNYXNzO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VXNlckhlYXJ0UmF0ZSgpIHtcclxuLy8gICBjb25zdCB1c2VySW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVzZXJIZWFydFJhdGVcIik7XHJcbi8vICAgcmV0dXJuIHVzZXJJbnB1dC52YWx1ZTtcclxuLy8gfVxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=