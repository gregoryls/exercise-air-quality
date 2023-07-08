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
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "insertCVDMortality": () => (/* binding */ insertCVDMortality),
/* harmony export */   "insertLungCancerMortality": () => (/* binding */ insertLungCancerMortality),
/* harmony export */   "insertUserCigarettePercentage": () => (/* binding */ insertUserCigarettePercentage),
/* harmony export */   "insertUserPM25Breathed": () => (/* binding */ insertUserPM25Breathed),
/* harmony export */   "toggleHidden": () => (/* binding */ toggleHidden)
/* harmony export */ });
function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");

  // convert µg input to mg for output
  const massMG = mass / 1000;
  massResult.textContent = `${massMG.toFixed(2)} mg`;
}

function insertUserCigarettePercentage(percent) {
  const cigarettePercentageResult = document.getElementById(
    "cigarettePercentageResult"
  );
  cigarettePercentageResult.textContent = `${percent}%`;
}

function insertLungCancerMortality(relativeRisk) {
  const lungCancerMortalityResult = document.getElementById("test");
  lungCancerMortalityResult.textContent = `Lung cancer mortality: ${relativeRisk}`;
}

function insertCVDMortality(relativeRisk) {
  const CVDMortalityResult = document.getElementById("test2");
  CVDMortalityResult.textContent = `CVD mortality: ${relativeRisk}`;
}

function toggleHidden(element, button, text1, text2, scroll) {
  const elem = document.getElementById(element);
  const btn = document.getElementById(button);

  if (elem.style.display === "none" || elem.style.display === "") {
    elem.style.display = "block";
    btn.textContent = text2;
    if (scroll) elem.scrollIntoView({ block: "nearest" });
  } else {
    elem.style.display = "none";
    btn.textContent = text1;
  }
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1CQUFtQjtBQUNqRDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ087QUFDUDtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDTztBQUNQO0FBQ0EscURBQXFELGFBQWE7QUFDbEU7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtCQUFrQjtBQUN4RCxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5Ly4vc3JjL0RPTS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgcmVxdWlyZSBzY29wZVxudmFyIF9fd2VicGFja19yZXF1aXJlX18gPSB7fTtcblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCBmdW5jdGlvbiBpbnNlcnRVc2VyUE0yNUJyZWF0aGVkKG1hc3MpIHtcclxuICBjb25zdCBtYXNzUmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYXNzUmVzdWx0XCIpO1xyXG5cclxuICAvLyBjb252ZXJ0IMK1ZyBpbnB1dCB0byBtZyBmb3Igb3V0cHV0XHJcbiAgY29uc3QgbWFzc01HID0gbWFzcyAvIDEwMDA7XHJcbiAgbWFzc1Jlc3VsdC50ZXh0Q29udGVudCA9IGAke21hc3NNRy50b0ZpeGVkKDIpfSBtZ2A7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRVc2VyQ2lnYXJldHRlUGVyY2VudGFnZShwZXJjZW50KSB7XHJcbiAgY29uc3QgY2lnYXJldHRlUGVyY2VudGFnZVJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgXCJjaWdhcmV0dGVQZXJjZW50YWdlUmVzdWx0XCJcclxuICApO1xyXG4gIGNpZ2FyZXR0ZVBlcmNlbnRhZ2VSZXN1bHQudGV4dENvbnRlbnQgPSBgJHtwZXJjZW50fSVgO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0THVuZ0NhbmNlck1vcnRhbGl0eShyZWxhdGl2ZVJpc2spIHtcclxuICBjb25zdCBsdW5nQ2FuY2VyTW9ydGFsaXR5UmVzdWx0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZXN0XCIpO1xyXG4gIGx1bmdDYW5jZXJNb3J0YWxpdHlSZXN1bHQudGV4dENvbnRlbnQgPSBgTHVuZyBjYW5jZXIgbW9ydGFsaXR5OiAke3JlbGF0aXZlUmlza31gO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0Q1ZETW9ydGFsaXR5KHJlbGF0aXZlUmlzaykge1xyXG4gIGNvbnN0IENWRE1vcnRhbGl0eVJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVzdDJcIik7XHJcbiAgQ1ZETW9ydGFsaXR5UmVzdWx0LnRleHRDb250ZW50ID0gYENWRCBtb3J0YWxpdHk6ICR7cmVsYXRpdmVSaXNrfWA7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVIaWRkZW4oZWxlbWVudCwgYnV0dG9uLCB0ZXh0MSwgdGV4dDIsIHNjcm9sbCkge1xyXG4gIGNvbnN0IGVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcclxuICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChidXR0b24pO1xyXG5cclxuICBpZiAoZWxlbS5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBlbGVtLnN0eWxlLmRpc3BsYXkgPT09IFwiXCIpIHtcclxuICAgIGVsZW0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIGJ0bi50ZXh0Q29udGVudCA9IHRleHQyO1xyXG4gICAgaWYgKHNjcm9sbCkgZWxlbS5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiBcIm5lYXJlc3RcIiB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBidG4udGV4dENvbnRlbnQgPSB0ZXh0MTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9