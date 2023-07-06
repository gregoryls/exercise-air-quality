export function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");

  // convert µg input to mg for output
  const massMG = mass / 1000;
  massResult.textContent = `${massMG.toFixed(2)} mg`;
}

export function insertUserCigarettePercentage(percent) {
  const cigarettePercentageResult = document.getElementById(
    "cigarettePercentageResult"
  );
  cigarettePercentageResult.textContent = `${percent}%`;
}

export function insertLungCancerMortality(relativeRisk) {
  const lungCancerMortalityResult = document.getElementById("test");
  lungCancerMortalityResult.textContent = `Lung cancer mortality: ${relativeRisk}`;
}

export function insertCVDMortality(relativeRisk) {
  const CVDMortalityResult = document.getElementById("test2");
  CVDMortalityResult.textContent = `CVD mortality: ${relativeRisk}`;
}

export function addClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element, className) {
  element.classList.remove(className);
}

export function toggleHidden(element, button, text1, text2, scroll) {
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
