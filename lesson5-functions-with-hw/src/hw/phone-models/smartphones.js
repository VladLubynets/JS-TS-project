export class Smartphone {
    #brand;
    #model;
    specs;

    constructor(brand, model, memory, battery) {
        this.#brand = brand;
        this.#model = model;
        this.specs = {
            memory: memory,
            battery: battery
        };
    }

    get brand() {
        return this.#brand.toUpperCase();
    }

    set brand(value) {
        this.#brand = value;
    }

    get model() {
        return this.#model;
    }

    set model(value) {
        this.#model = value;
    }

    get memory() {
        return `${this.specs.memory} GB`;
    }

    set memory(value) {
        this.specs.memory = value;
    }

    get battery() {
        return `${this.specs.battery} mAh`;
    }

    set battery(value) {
        this.specs.battery = value;
    }

    getSummary() {
        return `${this.brand} ${this.model} — ${this.memory} / ${this.battery}`;
    }
}
