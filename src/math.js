// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
// Ve = Minute Ventilation, the amount of air breathed usually Liters/minute

function getUserLungVolume() {
  const lungVolume = document.getElementById("userLungVolume");
  return Number(lungVolume.value);
}

function calculateMinuteVentilationFromHeartRate(heartRate, modifier) {
  // return 0 by force to avoid issues with exp(0) = 1 giving a small minute ventilation from heart rate of zero
  if (heartRate === 0) return 0;

  // boolean for user selection of 'Female?' checkbox
  const checkFemale = document.getElementById("female").checked;
  const minuteVentilation = Math.exp(1.162 + 0.021 * heartRate);

  // convert standard Liters/minute units to m^3/minute to match with standard pm2.5 concentration units
  const minuteVentilationM3 = minuteVentilation / 1000;

  // women have lungs 75% the size of men - apply correction factor
  if (checkFemale) return minuteVentilationM3 * 0.75;
  // allow user to modify result by a ratio of their lung volume vs standard 6L volume for average male
  if (typeof modifier === "number") return minuteVentilationM3 * (modifier / 6);
  return minuteVentilationM3;
}

function PM25ConcentrationFromAQI(AQI) {
  let Ih;
  let Il;
  let BPh;
  let BPl;

  if (AQI >= 0) {
    Ih = 50;
    Il = 0;
    BPh = 12;
    BPl = 0;
  }
  if (AQI >= 51) {
    Ih = 100;
    Il = 51;
    BPh = 35.4;
    BPl = 12.1;
  }
  if (AQI >= 101) {
    Ih = 150;
    Il = 101;
    BPh = 55.4;
    BPl = 35.5;
  }
  if (AQI >= 151) {
    Ih = 200;
    Il = 151;
    BPh = 150.4;
    BPl = 55.5;
  }
  if (AQI >= 201) {
    Ih = 300;
    Il = 201;
    BPh = 250.4;
    BPl = 150.5;
  }
  if (AQI >= 301) {
    Ih = 400;
    Il = 301;
    BPh = 350.4;
    BPl = 250.5;
  }
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

export function calculateRelativeRiskLungCancerMortality(mass, rounding) {
  // this function expects mass input with units of milligrams(mg)
  const risk = 1 + 0.3195 * mass ** 0.7433;
  if (!rounding) return risk;
  const riskRounded = risk.toFixed(2);
  return riskRounded;
}

export function calculateRelativeRiskCVDMortality(mass, rounding) {
  // this function expects mass input with units of milligrams(mg)
  // this covers ischemic heart disease(IHD), cardiavascular disease(CVD), and cardiopulmonary disease(CPD)
  const risk = 1 + 0.2685 * mass ** 0.273;
  if (!rounding) return risk;
  const riskRounded = risk.toFixed(2);
  return riskRounded;
}

function calculateVolumeAirBreathed(minuteVentilation, minutes) {
  // units in m^3, based on minute ventilation function
  const volume = minuteVentilation * minutes;
  return volume;
}

function calculatePM25MassBreathed(concentration, volume) {
  const PM25Mass = concentration * volume;
  return Number(PM25Mass);
}

function getUserAQI() {
  const userAQI = document.getElementById("userAQI");
  return Number(userAQI.value);
}

// Resting Inputs//
function getUserRestingHeartRate() {
  const userHeartRate = document.getElementById("userHeartRate");
  return Number(userHeartRate.value);
}

function getUserRestingDuration() {
  let duration = document.getElementById("userRestingDuration");
  // convert input from hours to minutes
  duration = Number(duration.value * 60);
  return duration;
}
// //

// Exercise Inputs//
function getUserExerciseHeartRate() {
  const exerciseHeartRate = document.getElementById("userExerciseHeartRate");
  return Number(exerciseHeartRate.value);
}

function getUserExerciseDuration() {
  const duration = document.getElementById("userExerciseDuration");
  return Number(duration.value);
}
// //

export function calculateUserPM25Mass(day) {
  // day arg takes boolean to switch between raw user input and forced 24hr time period
  // final unit is in micrograms
  const PM25Concentration = PM25ConcentrationFromAQI(getUserAQI());
  let userRestingDuration = getUserRestingDuration();
  let userExerciseDuration = getUserExerciseDuration();

  if (day) {
    if (userExerciseDuration > 1440) userExerciseDuration = 1440;
    userRestingDuration = 1440 - userExerciseDuration;
  }

  // console.log(userExerciseDuration);
  // console.log(userRestingDuration);

  // Resting Mass //
  const userRestingMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserRestingHeartRate(),
    getUserLungVolume()
  );
  const userRestingVolumeBreathed = calculateVolumeAirBreathed(
    userRestingMinuteVolume,
    userRestingDuration
  );
  const userRestingPM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userRestingVolumeBreathed
  );
  // //

  // Exercise Mass //
  const userExerciseMinuteVolume = calculateMinuteVentilationFromHeartRate(
    getUserExerciseHeartRate(),
    getUserLungVolume()
  );
  const userExerciseVolumeBreathed = calculateVolumeAirBreathed(
    userExerciseMinuteVolume,
    userExerciseDuration
  );
  const userExercisePM25Mass = calculatePM25MassBreathed(
    PM25Concentration,
    userExerciseVolumeBreathed
  );
  // //

  // round result to nearest integer
  const userRestingPM25MassRounded = Math.round(userRestingPM25Mass);
  const userExercisePM25MassRounded = Math.round(userExercisePM25Mass);
  const totalPM25Mass =
    userRestingPM25MassRounded + userExercisePM25MassRounded;
  return totalPM25Mass;
}

export function convertToCigarettePercentage(pm25) {
  // pm25 comes in as micrograms, a common cigarette has 12,000 micrograms of PM2.5
  // mulitply but 100 for percentage of a cigarette breathed for the given PM2.5 mass
  const cigarettePercent = (pm25 / 12000) * 100;

  // round result to two decimal places
  const cigarettePercentRounded = Number(cigarettePercent.toFixed(2));
  return cigarettePercentRounded;
}
