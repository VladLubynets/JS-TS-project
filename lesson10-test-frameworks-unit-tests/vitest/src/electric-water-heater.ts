import { IHeater } from './iheater';
import { IHeaterBox } from './iheater-box';

export class ElectricWaterHeater implements IHeater, IHeaterBox {
    private thermalSensorIn: number;
    private thermalSensorOut: number;

    public get currentTemperature(): number {
        return this.thermalSensorOut;
    }

    public thermalRegulator: number;
    public energySource: string;

    // IHeaterBox
    public height: number;
    public width: number;
    public depth: number;

    public constructor(temperature: number, size: string) {
        this.thermalSensorIn = 20;
        this.thermalSensorOut = 20;
        this.thermalRegulator = temperature;
        this.energySource = 'electricity';
        const dimensions = size.split('x');
        this.height = Number(dimensions[0]);
        this.width = Number(dimensions[1]);
        this.depth = Number(dimensions[2]);
    }

    public heatWater(): void {
        for (let i = this.thermalSensorIn; i < 100; i++) {
            if (i < this.thermalRegulator) {
                this.thermalSensorOut++;
            }
        }
    }

    public heatCustomWater(temperature: number): void {
        for (let i = this.thermalSensorIn; i < 100; i++) {
            if (i < temperature) {
                this.thermalSensorOut++;
            }
        }
    }

    public getDimensions(): string {
        return `${this.height}x${this.width}x${this.depth}`;
    }
}
