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
/* harmony export */   "insertUserPM25Breathed": () => (/* binding */ insertUserPM25Breathed)
/* harmony export */ });
function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");
  // \u00b5 corresponds to µ
  // massResult.textContent = `${mass} \u00b5g`;

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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOztVQUFBO1VBQ0E7Ozs7O1dDREE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05PO0FBQ1A7QUFDQTtBQUNBLGlDQUFpQyxNQUFNO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNPO0FBQ1A7QUFDQSxvRUFBb0UsYUFBYTtBQUNqRjtBQUNBO0FBQ087QUFDUDtBQUNBLHFEQUFxRCxhQUFhO0FBQ2xFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4ZXJjaXNlLWFpci1xdWFsaXR5L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZXhlcmNpc2UtYWlyLXF1YWxpdHkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9leGVyY2lzZS1haXItcXVhbGl0eS8uL3NyYy9ET00uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhlIHJlcXVpcmUgc2NvcGVcbnZhciBfX3dlYnBhY2tfcmVxdWlyZV9fID0ge307XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgZnVuY3Rpb24gaW5zZXJ0VXNlclBNMjVCcmVhdGhlZChtYXNzKSB7XHJcbiAgY29uc3QgbWFzc1Jlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibWFzc1Jlc3VsdFwiKTtcclxuICAvLyBcXHUwMGI1IGNvcnJlc3BvbmRzIHRvIMK1XHJcbiAgLy8gbWFzc1Jlc3VsdC50ZXh0Q29udGVudCA9IGAke21hc3N9IFxcdTAwYjVnYDtcclxuXHJcbiAgLy8gY29udmVydCDCtWcgaW5wdXQgdG8gbWcgZm9yIG91dHB1dFxyXG4gIGNvbnN0IG1hc3NNRyA9IG1hc3MgLyAxMDAwO1xyXG4gIG1hc3NSZXN1bHQudGV4dENvbnRlbnQgPSBgJHttYXNzTUcudG9GaXhlZCgyKX0gbWdgO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zZXJ0VXNlckNpZ2FyZXR0ZVBlcmNlbnRhZ2UocGVyY2VudCkge1xyXG4gIGNvbnN0IGNpZ2FyZXR0ZVBlcmNlbnRhZ2VSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcclxuICAgIFwiY2lnYXJldHRlUGVyY2VudGFnZVJlc3VsdFwiXHJcbiAgKTtcclxuICBjaWdhcmV0dGVQZXJjZW50YWdlUmVzdWx0LnRleHRDb250ZW50ID0gYCR7cGVyY2VudH0lYDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEx1bmdDYW5jZXJNb3J0YWxpdHkocmVsYXRpdmVSaXNrKSB7XHJcbiAgY29uc3QgbHVuZ0NhbmNlck1vcnRhbGl0eVJlc3VsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVzdFwiKTtcclxuICBsdW5nQ2FuY2VyTW9ydGFsaXR5UmVzdWx0LnRleHRDb250ZW50ID0gYEx1bmcgY2FuY2VyIG1vcnRhbGl0eTogJHtyZWxhdGl2ZVJpc2t9YDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydENWRE1vcnRhbGl0eShyZWxhdGl2ZVJpc2spIHtcclxuICBjb25zdCBDVkRNb3J0YWxpdHlSZXN1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlc3QyXCIpO1xyXG4gIENWRE1vcnRhbGl0eVJlc3VsdC50ZXh0Q29udGVudCA9IGBDVkQgbW9ydGFsaXR5OiAke3JlbGF0aXZlUmlza31gO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==