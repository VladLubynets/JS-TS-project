import { ICar } from './abstractions/i-car';

export class Car implements ICar {
    public brand: string;
    public model: string;
    public speed: number;
    private fuel: number;

    public constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
        this.speed = 0;
        this.fuel = 100;
    }

    public start(): void {
        console.log(`${this.brand} ${this.model} started!`);
    }

    public stop(): void {
        this.speed = 0;
        console.log(`${this.brand} ${this.model} stopped!`);
    }

    public accelerate(): void {
        this.speed += 20;
        this.fuel -= 5;
        console.log(`${this.brand} ${this.model} accelerated to ${this.speed} km/h`);
    }

    public getInfo(): string {
        return `${this.brand} ${this.model} | Speed: ${this.speed} km/h | Fuel: ${this.fuel}%`;
    }
}
