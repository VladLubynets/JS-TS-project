export interface IWaterHeater {
    desiredTemperature: number;
    currentTemperature: number;
    powerState: boolean;

    turnOn(): void;
    turnOff(): void;
    setTemperature(temperature: number): number
    heatWater(): void;
}
