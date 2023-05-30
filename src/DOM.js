export function insertUserPM25Breathed(mass) {
  const massResult = document.getElementById("massResult");

  massResult.textContent = mass;
}

export function insertUserCigarettePercentage(percent) {
  const p = document.createElement("p");
  const cigarettePercentage = document.getElementById("cigarettePercentage");
  p.textContent = percent;
  cigarettePercentage.append(p);
}
