- calc cooling load from sensible heat + latent heat on an hourly (?) timeframe
- convert cooling load (in Watts) to electrical power from ac efficiency
- sum power over time to get energy in kWh
- use utility info to convert kWh into pollution impact

## useful terms

- rateOfHeatFlow (Watts, commonly Q)
- tempDifferential = indoor - outdoor differential
- heatTransferCoefficient (W/(m<sup>2</sup>K), commonly U)
- area (m<sup>2</sup>)
- volume (m<sup>3</sup>)
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
- solarHeatGainCoefficient, 0-1 based on window. lower blocks more heat
- incidentSolarIrradiance (W x m<sup>-2</sup>, sun on window https://nsrdb.nrel.gov/ and https://power.larc.nasa.gov/)
  - beamIrradiance = directNormalIrradiance \* max(0,cos(angleOfIncidence))
- volumetricFlow = (airChangesPerHour x volume)/3600 (m<sup>3</sup>/s)
- massFlow = airDensity x volumetricFlow (kg/s)
- infiltrationHeat = massFlow x airHeatCapacity x tempDifferential
- human at rest ~= 100W
- home baseline ~= 1000W (huge variance, consider refining)
- ignore latent cooling energy due to very low humidity environment, reasses for other areas (could be 50%+ of energy in highly humid hot places)
- houseWidth
- houseLength
- wallHeight
- solarDeclinationAngle (cooper paper),
- solarAzimuthAngle (zhang paper)
  | Surface Type | Color / Finish | Solar Absorptance (α) | Emissivity (ε) | Typical (h_o) (W/m²·K) | **ΔT (°C)** at 600 W/m² | **ΔT (°C)** at 800 W/m² | Notes |
  | -------------------------------- | ----------------- | --------------------- | -------------- | ---------------------- | ----------------------- | ----------------------- | ------------------------------------- |
  | **Painted wall – white / light** | matte | 0.25 – 0.35 | 0.9 | 20–25 | 6 – 10 | 8 – 14 | Common light exterior paint or stucco |
  | **Painted wall – medium** | beige / gray | 0.5 – 0.6 | 0.9 | 20–25 | 12 – 18 | 16 – 24 | Typical residential siding color |
  | **Painted wall – dark** | brown / dark gray | 0.8 – 0.9 | 0.9 | 20–25 | 19 – 27 | 25 – 36 | Very dark, nearly black paint |
  | **Asphalt shingle roof** | dark gray / black | 0.85 – 0.95 | 0.9 | 25–30 | 17 – 23 | 23 – 31 | Most residential roofs |
  | **Metal roof (bare aluminum)** | shiny | 0.25 – 0.3 | 0.1 – 0.2 | 25–35 | 4 – 7 | 5 – 10 | Reflective but low emissivity |
  | **Metal roof (painted)** | colored | 0.6 – 0.8 | 0.8 – 0.9 | 25–35 | 10 – 19 | 13 – 25 | Typical colored metal roofing |
  | **Concrete / masonry wall** | natural gray | 0.55 – 0.65 | 0.9 | 20–25 | 13 – 19 | 17 – 25 | Common exterior finish |
  | **White membrane roof** | cool roof coating | 0.2 – 0.3 | 0.9 | 25–35 | 3 – 7 | 4 – 9 | “Cool roof” technology |
  | **Bituminous flat roof** | black | 0.9 – 0.95 | 0.9 | 25–35 | 15 – 22 | 20 – 30 | Old commercial black roofs |
