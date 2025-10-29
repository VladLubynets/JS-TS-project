import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { ElectricCar } from '../hw/electric-car';

describe('ElectricCar class', () => {
    let electricCar: ElectricCar;

    beforeEach(() => {
        electricCar = new ElectricCar('Tesla', 'Model 3');
    });

    describe('Constructor', () => {
        it('should create electric car with brand and model', () => {
            expect(electricCar.brand).to.equal('Tesla');
            expect(electricCar.model).to.equal('Model 3');
        });

        it('should initialize speed to 0', () => {
            expect(electricCar.speed).to.equal(0);
        });
    });

    describe('accelerate() method', () => {
        it('should increase speed', () => {
            electricCar.accelerate();
            expect(electricCar.speed).to.equal(25);
        });
    });

    describe('stop() method', () => {
        it('should reset speed to 0', () => {
            electricCar.accelerate();
            electricCar.stop();
            expect(electricCar.speed).to.equal(0);
        });
    });

    describe('getInfo() method', () => {
        it('should return info string', () => {
            const info = electricCar.getInfo();
            expect(info).to.be.a('string');
            expect(info).to.include('Tesla');
        });
    });
});
