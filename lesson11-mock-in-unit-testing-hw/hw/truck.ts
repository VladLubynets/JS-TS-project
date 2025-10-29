import { ICar } from './abstractions/i-car';

export class Truck implements ICar {
    public brand: string;
    public model: string;
    public speed: number;
    private fuel: number;
    private cargo: number;

    public constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.fuel = 100;
        this.cargo = 0;
    }

    public start(): void {
        console.log(`${this.brand} ${this.model} started!`);
    }

    public stop(): void {
        this.speed = 0;
        console.log(`${this.brand} ${this.model} stopped!`);
    }

    public accelerate(): void {
        this.speed += 10;
        this.fuel -= 8;
        console.log(`${this.brand} ${this.model} accelerated to ${this.speed} km/h`);
    }

    public loadCargo(weight: number): void {
        this.cargo += weight;
        console.log(`Loaded ${weight} kg. Total cargo: ${this.cargo} kg`);
    }

    public getInfo(): string {
        return `${this.brand} ${this.model} | Speed: ${this.speed} km/h | Fuel: ${this.fuel}% | Cargo: ${this.cargo} kg`;
    }
}
