export class Fruit {
    #name;
    #color;
    sweetness;

    constructor(name, color, sweetness) {
        this.#name = name;
        this.#color = color;
        this.sweetness = sweetness;
    }

    get name() {
        return this.#name.toLocaleUpperCase();
    };

    set name(value) {
        this.#name = value.toLocaleLowerCase();
    };

    get color() {
        return this.#color;
    };

    logInfo() {
        console.log(this.#name, this.color, this.sweetness);
    }
};
