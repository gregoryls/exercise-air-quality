export function insertUserPM25Breathed(mass) {
  const p = document.createElement("p");
  const massOutput = document.getElementById("massOutput");

  //
  massOutput.removeChild(massOutput.lastChild);

  p.textContent = mass;
  massOutput.append(p);
}

export function insertUserCigarettePercentage(percent) {
  const p = document.createElement("p");
  const cigarettePercentage = document.getElementById("cigarettePercentage");
  p.textContent = percent;
  cigarettePercentage.append(p);
}
