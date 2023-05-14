import "./style.css";
import calculateMinuteVolumeFromHeartRate, {
  PM25ConcentrationFromAQI,
} from "./math";

console.log(PM25ConcentrationFromAQI(401));
console.log(calculateMinuteVolumeFromHeartRate(60));

// NOTE - make page as checkbox calculator, did you do a workout? how long? --> adds to total count for a 24 hour period
// TODO look up more about indoor vs outdoor smoking
