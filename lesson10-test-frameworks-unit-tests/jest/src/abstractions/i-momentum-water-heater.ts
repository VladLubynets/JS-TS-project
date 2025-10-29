export interface IMomentumWaterHeater {
    waterRelayState: boolean;
    heatWater(): void;
    stepHeatWater(): void;
}
