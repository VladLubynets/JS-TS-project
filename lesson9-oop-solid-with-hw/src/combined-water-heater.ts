import { IHouseHeater } from './abstractions/i-house-heater';
import { IWaterHeater } from './abstractions/i-water-heater';

// ISP
export class CombinedWaterHeater implements IWaterHeater, IHouseHeater {
    public desiredTemperature: number;
    public currentTemperature: number;
    public powerState: boolean;
    public heatTemperature = 20;

    public constructor(public readonly name: string) {
        this.currentTemperature = 20;
        this.powerState = false;
        this.desiredTemperature = 35;
    }

    public turnOn(): void {
        this.powerState = true;
    }

    public turnOff(): void  {
        this.powerState = false;
    }

    public setTemperature(temperature: number): number {
        this.desiredTemperature = temperature;
        return this.desiredTemperature;
    }

    public heatWater(): void {
        this.heatWaterInsideLogic();
    }

    public getCurrentTemperature(): number {
        return this.currentTemperature;
    }

    public heatHouse(): void {
        this.currentTemperature = this.heatTemperature;
    }

    public setHouseHeaterTemperature(tem: number): number {
        this.heatTemperature = tem;
        return this.heatTemperature;
    }

    private heatWaterInsideLogic(): void {
        if (!this.powerState) {
            console.log(`${this.name} is not on!`);
            return;
        }

        while (this.currentTemperature < this.desiredTemperature) {
            this.currentTemperature++;
            console.log(`${this.name} is heating up... ${this.currentTemperature} C`);
        }
    }
}
