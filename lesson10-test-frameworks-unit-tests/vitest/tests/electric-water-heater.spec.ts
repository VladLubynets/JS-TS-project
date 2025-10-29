import { assert, describe, expect, it, test } from 'vitest';
import { ElectricWaterHeater } from '../src/electric-water-heater';
import { expect as expectChai } from 'chai';

describe('ElectricWaterHeater class Unit test suite', () => {
    test('heatWater should heat the water to 50 degrees', () => {
        // Arrange
        const obj = new ElectricWaterHeater(50, '25x25x50');

        // Act
        obj.heatWater();

        // Assert
        expect(obj.currentTemperature).to.be.equal(50);
        assert(obj.energySource === 'electricity');
    });

    it('heatCustomWater(80) should heat the water to 80 degrees', () => {
        // Arrange
        const obj = new ElectricWaterHeater(50, '25x25x50');

        // Act
        obj.heatCustomWater(80);

        // Assert
        expectChai(obj.currentTemperature).to.be.equal(50);
    });
});
