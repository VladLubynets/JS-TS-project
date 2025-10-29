import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'ts-sinon';
import { Car } from './car';
import { ElectricCar } from './electric-car';
import { Truck } from './truck';

describe('Car Tests with Mocks', () => {
    let consoleSpy: ReturnType<typeof sinon.default.spy>;

    beforeEach(() => {
        consoleSpy = sinon.default.spy(console, 'log');
    });

    afterEach(() => {
        sinon.default.restore();
    });

    describe('Car class methods', () => {
        it('should spy on start method and verify console.log call', () => {
            const car = new Car('Toyota', 'Camry');
            const startSpy = sinon.default.spy(car, 'start');

            car.start();

            expect(startSpy.calledOnce).to.be.true;
            expect(consoleSpy.calledWith('Toyota Camry started!')).to.be.true;
        });

        it('should spy on accelerate method and verify speed change', () => {
            const car = new Car('Toyota', 'Camry');
            const accelerateSpy = sinon.default.spy(car, 'accelerate');

            car.accelerate();

            expect(accelerateSpy.calledOnce).to.be.true;
            expect(car.speed).to.equal(20);
            expect(consoleSpy.calledWith('Toyota Camry accelerated to 20 km/h')).to.be.true;
        });

        it('should stub getInfo method to return custom value', () => {
            const car = new Car('Toyota', 'Camry');
            const getInfoStub = sinon.default.stub(car, 'getInfo').returns('Mocked Info: Test Car');

            const info = car.getInfo();

            expect(getInfoStub.calledOnce).to.be.true;
            expect(info).to.equal('Mocked Info: Test Car');
        });
    });

    describe('ElectricCar class methods', () => {
        it('should mock ElectricCar accelerate method behavior', () => {
            const electricCar = new ElectricCar('Tesla', 'Model 3');
            const accelerateMock = sinon.default.stub(electricCar, 'accelerate').callsFake(() => {
                electricCar.speed += 30;
            });

            electricCar.accelerate();

            expect(accelerateMock.calledOnce).to.be.true;
            expect(electricCar.speed).to.equal(30);
        });
    });

    describe('Truck class methods', () => {
        it('should spy on loadCargo method and verify multiple calls', () => {
            const truck = new Truck('Ford', 'F-150');
            const loadCargoSpy = sinon.default.spy(truck, 'loadCargo');

            truck.loadCargo(500);
            truck.loadCargo(300);

            expect(loadCargoSpy.calledTwice).to.be.true;
            expect(loadCargoSpy.firstCall.calledWith(500)).to.be.true;
            expect(loadCargoSpy.secondCall.calledWith(300)).to.be.true;
            expect(consoleSpy.calledWith('Loaded 500 kg. Total cargo: 500 kg')).to.be.true;
        });
    });

    describe('Car instantiation and property access', () => {
        it('should mock Car constructor and verify properties', () => {
            const car = new Car('Honda', 'Civic');

            expect(car.brand).to.equal('Honda');
            expect(car.model).to.equal('Civic');
            expect(car.speed).to.equal(0);
        });

        it('should stub stop method to return status instead of void', () => {
            const car = new Car('BMW', 'X5');
            const stopStub = sinon.default.stub(car, 'stop').callsFake(() => {
                car.speed = 0;
                return 'stopped' as unknown as void;
            });

            const result = stopStub();

            expect(stopStub.calledOnce).to.be.true;
            expect(car.speed).to.equal(0);
        });
    });
});

