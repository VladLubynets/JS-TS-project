import { IMomentumWaterHeater } from './abstractions/i-momentum-water-heater';
import { IWaterHeater } from './abstractions/i-water-heater';
import { ElectricBoiler } from './electric-boiler';
import { GasBoiler } from './gas-boiler';
import { MomentumElectricWaterHeater } from './momentum-electric-water-heater';

class House {
    public constructor(public readonly name: string) {}

    public heatWater(boiler: IWaterHeater): void {
        boiler.turnOn();
        boiler.setTemperature(40);
        boiler.heatWater();
    }

    public heatBoilerWithMomentumWaterHeater(boiler: IMomentumWaterHeater): void {
        boiler.stepHeatWater();
    }
}

// DIP
class BoilerShop {
    public get boilers(): IWaterHeater[] {
        return this._boilers;
    }

    public constructor(private _boilers: IWaterHeater[] = []) {}

    public testBoiler(boiler: IWaterHeater): void {
        boiler.turnOn();
        boiler.setTemperature(40);
        boiler.heatWater();
        boiler.turnOff();
    }

    public addBoiler(boiler: IWaterHeater): void {
        this._boilers.push(boiler);
    }

    public sellBoiler(boiler: IWaterHeater): void {
        if (!this._boilers.includes(boiler))
            return;
        this._boilers.splice(this._boilers.indexOf(boiler), 1);
    }
}

const house = new House('My house');
const gBoiler = new GasBoiler('Gas Boiler');
const eBoiler = new ElectricBoiler('Electric Boiler');
const meBoiler = new MomentumElectricWaterHeater('Momentum Electric Boiler');

house.heatWater(gBoiler);
// fow moments later
console.log('------------------');
house.heatWater(eBoiler);

// fow moments later
// LSP
console.log('------------------');
meBoiler.waterRelayState = true;
house.heatWater(meBoiler);

// fow moments later
console.log('------------------');
meBoiler.currentTemperature = 20;
meBoiler.stepHeatWater();


console.log('------------------');
const boilerShop = new BoilerShop([gBoiler, eBoiler, meBoiler]);
boilerShop.testBoiler(gBoiler);
boilerShop.sellBoiler(gBoiler);
console.log(boilerShop.boilers);


