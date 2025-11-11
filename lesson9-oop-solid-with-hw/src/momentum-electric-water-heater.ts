import { IMomentumWaterHeater } from './abstractions/i-momentum-water-heater';
import { ElectricBoiler } from './electric-boiler';

// OCP
export class MomentumElectricWaterHeater extends ElectricBoiler implements IMomentumWaterHeater {
    public waterRelayState = false;

    public constructor(public readonly name: string) {
        super(name);
    }

    // method override
    public heatWater(): void {
        this.heatWaterInsideLogicForMomentum();
    }

    public stepHeatWater(): void {
        this.stepHeatWaterInsideLogicForMomentum();
    }

    private heatWaterInsideLogicForMomentum(): void {
        if (!this.powerState) {
            console.log(`${this.name} is not on!`);
            return;
        }

        if (this.waterRelayState) {
            console.log(`${this.name} is heating up...`);
            super.heatWater();
        } else {
            console.log('No water flow detected');
        }
    }

    private stepHeatWaterInsideLogicForMomentum(): void {
        if (!this.powerState) {
            console.log(`${this.name} is not on!`);
            return;
        }

        if (this.waterRelayState) {
            console.log(`${this.name} is heating up...`);
            while (this.currentTemperature < this.desiredTemperature) {
                this.currentTemperature = this.currentTemperature + 3;
                console.log(`${this.name} is heating up... ${this.currentTemperature} C`);
            }
        } else {
            console.log('No water flow detected');
        }
    }
}
