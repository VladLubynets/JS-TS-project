import { ICar } from './abstractions/i-car';

export function testCar(car: ICar): void {
    console.log(`\n---- Testing ${car.brand} ${car.model} ----`);
    console.log(`Info: ${car.getInfo()}`);

    console.log('Starting...');
    car.start();

    console.log('Accelerating...');
    car.accelerate();
    car.accelerate();

    console.log('Stopping...');
    car.stop();

    console.log(`Result: ${car.getInfo()}`);
    console.log('---- Test completed ----');
}
