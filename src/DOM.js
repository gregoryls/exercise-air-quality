export function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");
  // \u00b5 corresponds to µ
  massResult.textContent = `${mass} \u00b5g`;
}

export function insertUserCigarettePercentage(percent) {
  const cigarettePercentageResult = document.getElementById(
    "cigarettePercentageResult"
  );
  cigarettePercentageResult.textContent = `${percent}%`;
}
