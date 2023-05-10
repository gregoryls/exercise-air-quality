// AQI = Air Quality Index
// PM2.5 = Particulate Matter 2.5 micrometer particles
function PM25ConcentrationFromAQI(AQI) {
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
  console.log(BPh);
}
PM25ConcentrationFromAQI(450);
