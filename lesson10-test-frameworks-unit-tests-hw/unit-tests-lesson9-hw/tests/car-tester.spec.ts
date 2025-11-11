import { expect as expectChai } from 'chai';
import { describe, it, beforeEach, afterEach, jest, expect } from '@jest/globals';
import { Car } from '../hw/car';
import { ElectricCar } from '../hw/electric-car';
import { Truck } from '../hw/truck';
import { testCar } from '../hw/car-tester';

describe('testCar function', () => {
    let consoleSpy: ReturnType<typeof jest.spyOn>;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('when testing Car object', () => {
        it('should manipulate Car object', () => {
            const car = new Car('Toyota', 'Camry');
            const initialSpeed = car.speed;

            testCar(car);

            expect(car.speed).toBe(0);
            expectChai(car.speed).to.equal(0); 
            expect(consoleSpy).toHaveBeenCalled();
        });

        it('should modify car properties', () => {
            const car = new Car('BMW', 'X5');
            
            testCar(car);
            
            const info = car.getInfo();
            expect(typeof info).toBe('string');
            expectChai(info).to.be.a('string');
            expectChai(info).to.include('BMW');
        });
    });

    describe('when testing ElectricCar object', () => {
        it('should manipulate ElectricCar object', () => {
            const electricCar = new ElectricCar('Tesla', 'Model 3');

            testCar(electricCar);

            expect(electricCar.speed).toBe(0);
            expectChai(electricCar.speed).to.equal(0);
        });
    });

    describe('when testing Truck object', () => {
        it('should manipulate Truck object', () => {
            const truck = new Truck('Ford', 'F-150');

            testCar(truck);

            expect(truck.speed).toBe(0);
            expectChai(truck.speed).to.equal(0);
        });
    });
});
