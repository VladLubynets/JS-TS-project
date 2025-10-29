export interface IHeater {
    // thermalSensorIn: number;  // should be private
    // thermalSensorOut: number; // should be private
    thermalRegulator: number;
    energySource: string;

    heatWater(): void;
    heatCustomWater(temperature: number): void;
}
