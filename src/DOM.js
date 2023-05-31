export function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");

  massResult.textContent = mass;
}

export function insertUserCigarettePercentage(percent) {
  const cigarettePercentageResult = document.getElementById(
    "cigarettePercentageResult"
  );
  cigarettePercentageResult.textContent = `${percent}%`;
}
