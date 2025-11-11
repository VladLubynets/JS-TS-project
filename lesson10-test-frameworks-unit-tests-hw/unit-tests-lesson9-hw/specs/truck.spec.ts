import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Truck } from '../hw/truck';

describe('Truck class', () => {
    let truck: Truck;

    beforeEach(() => {
        truck = new Truck('Ford', 'F-150');
    });

    describe('Constructor', () => {
        it('should create truck with brand and model', () => {
            expect(truck.brand).to.equal('Ford');
            expect(truck.model).to.equal('F-150');
        });

        it('should initialize speed to 0', () => {
            expect(truck.speed).to.equal(0);
        });
    });

    describe('accelerate() method', () => {
        it('should increase speed', () => {
            truck.accelerate();
            expect(truck.speed).to.equal(10);
        });
    });

    describe('stop() method', () => {
        it('should reset speed to 0', () => {
            truck.accelerate();
            truck.stop();
            expect(truck.speed).to.equal(0);
        });
    });

    describe('loadCargo() method', () => {
        it('should load cargo', () => {
            truck.loadCargo(500);
            const info = truck.getInfo();
            expect(info).to.include('Cargo: 500 kg');
        });
    });

    describe('getInfo() method', () => {
        it('should return info string', () => {
            const info = truck.getInfo();
            expect(info).to.be.a('string');
            expect(info).to.include('Ford');
        });
    });
});
