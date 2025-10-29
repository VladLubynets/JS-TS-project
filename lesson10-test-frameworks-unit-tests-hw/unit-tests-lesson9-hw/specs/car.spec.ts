import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Car } from '../hw/car';

describe('Car class', () => {
    let car: Car;

    beforeEach(() => {
        car = new Car('Toyota', 'Camry');
    });

    describe('Constructor', () => {
        it('should create car with brand and model', () => {
            expect(car.brand).to.equal('Toyota');
            expect(car.model).to.equal('Camry');
        });

        it('should initialize speed to 0', () => {
            expect(car.speed).to.equal(0);
        });
    });

    describe('accelerate() method', () => {
        it('should increase speed', () => {
            car.accelerate();
            expect(car.speed).to.equal(20);
        });
    });

    describe('stop() method', () => {
        it('should reset speed to 0', () => {
            car.accelerate();
            car.stop();
            expect(car.speed).to.equal(0);
        });
    });

    describe('getInfo() method', () => {
        it('should return info string', () => {
            const info = car.getInfo();
            expect(info).to.be.a('string');
            expect(info).to.include('Toyota');
        });
    });
});
