// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
// Ve = Minute Volume, the amount of air breathed usually Liters/minute

export default function calculateMinuteVolumeFromHeartRate(heartrate) {
  const Ve = Math.exp(1.162 + 0.021 * heartrate);
  return Ve;
}

export function PM25ConcentrationFromAQI(AQI) {
  let Ih;
  let Il;
  let BPh;
  let BPl;

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

export function calculateVolumeAirBreathed(minuteVentilation, minutes) {
  const volume = minuteVentilation * minutes;
  return volume;
}
