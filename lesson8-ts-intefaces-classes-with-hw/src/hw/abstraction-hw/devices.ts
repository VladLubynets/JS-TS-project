export abstract class BaseDevice {
    brand: string;
    model: string;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
    }

    abstract getDescription(): string;

    getFullName(): string {
        return `${this.brand} ${this.model}`;
    }
}

export class Phone extends BaseDevice {
    batteryCapacity: number;

    constructor(brand: string, model: string, batteryCapacity: number) {
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }

    getDescription(): string {
        return `Phone ${this.getFullName()} with battery ${this.batteryCapacity} mAh`;
    }
}

export class Laptop extends BaseDevice {
    ramSize: number;

    constructor(brand: string, model: string, ramSize: number) {
        super(brand, model);
        this.ramSize = ramSize;
    }

    getDescription(): string {
        return `Laptop ${this.getFullName()} with ${this.ramSize} GB RAM`;
    }
}
