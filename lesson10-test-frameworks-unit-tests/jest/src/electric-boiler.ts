import { IWaterHeater } from './abstractions/i-water-heater';

export class ElectricBoiler implements IWaterHeater{
    public desiredTemperature: number;
    public currentTemperature: number;
    public powerState: boolean;

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
