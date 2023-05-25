export function insertUserPM25Breathed(mass) {
  const p = document.createElement("p");
  const massOutput = document.getElementById("massOutput");
  p.textContent = mass;
  massOutput.append(p);
}

export function insertUserCigarettePercentage(percent) {}
