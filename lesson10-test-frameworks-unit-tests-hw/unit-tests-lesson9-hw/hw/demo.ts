import { Car } from './car';
import { ElectricCar } from './electric-car';
import { Truck } from './truck';
import { testCar } from './car-tester';

console.log('SIMPLE CAR PROJECT');
console.log('-------------------');

const toyota = new Car('Toyota', 'Camry');
const tesla = new ElectricCar('Tesla', 'Model 3');
const ford = new Truck('Ford', 'F-150');

console.log('Created cars:');
console.log(`1. ${toyota.getInfo()}`);
console.log(`2. ${tesla.getInfo()}`);
console.log(`3. ${ford.getInfo()}\n`);

console.log('Testing through interface:');
testCar(toyota);
testCar(tesla);
testCar(ford);

console.log('Special truck methods:');
ford.loadCargo(500);
ford.loadCargo(300);
console.log(`Final info: ${ford.getInfo()}`);
