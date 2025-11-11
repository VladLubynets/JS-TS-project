export class Vegetable {
    #name;
    #color;
    size;

    constructor(name, color, size) {
        this.#name = name;
        this.#color = color;
        this.size = size;
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
        console.log(this.#name, this.color, this.size);
    }
};
