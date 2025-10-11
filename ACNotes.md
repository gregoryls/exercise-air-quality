- calc cooling load from sensible heat + latent heat on an hourly (?) timeframe
- convert cooling load (in Watts) to electrical power from ac efficiency
- sum power over time to get energy in kWh
- use utility info to convert kWh into pollution impact

## useful terms

- rateOfHeatFlow (Watts, commonly Q)
- tempDifferential = indoor - outdoor differential
- heatTransferCoefficient (W/(m<sup>2</sup>K), commonly U)
- area (m<sup>2</sup>)
- airDensity (kg \* m<sup>-2</sup>)
- airHeatCapacity (J _ kg<sup>-1</sup> _ K<sup>-1</sup>)
- buildingVolume (m<sup>3</sup>)
- airChangesPerHour
- coefficientOfPerformance = cooling delivered (W)/eletrical input (W)
- COPcooling theory maximum: Tcold/(Thot - Tcold)
- 1 kWh = 3.6×10^6 J
- 1 W = 3.41 BTU/h
- Energy efficienty ratio(EER) standard: 35C outside, 27C inside, 50% humidity
- seasonal EER, SEER: cooling output in a season divided by total electrical input during same period
- EER = 0.875 x SEER, simple residential conversion
- EER = -0.02 x SEER<sup>2</sup> + 1.12 x SEER, not appropriate in all climates
