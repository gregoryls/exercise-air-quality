export function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");
  // \u00b5 corresponds to µ
  // massResult.textContent = `${mass} \u00b5g`;
  massResult.textContent = `${mass / 1000} mg`;
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
