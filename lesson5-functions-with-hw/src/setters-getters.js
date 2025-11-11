import { Fruit, Vegetable } from './models/index.js';

const apple = {
    _name: 'apple macintosh',
    _color: 'red',
    _sweetness: 10,
    _positiveNumber: 10,

    get name() {
        return this._name.toLocaleUpperCase();
    },
    set name(value) {
        this._name = value.toLocaleLowerCase();
    }
};

console.log(apple.name);
apple.name = 'Apple Golden';
console.log(apple._name);
console.log(apple.name);


const banana = new Fruit('banana', 'yellow', 8);
console.log(banana.name);
banana.name = 'mini-banana';
console.log(banana.name);
banana.color = 'red';
banana.logInfo();

const carrot = new Vegetable('carrot', 'orange', 5);
console.log(carrot.name);
carrot.name = 'mini-carrot';
console.log(carrot.name);
carrot.color = 'green';
carrot.logInfo();
