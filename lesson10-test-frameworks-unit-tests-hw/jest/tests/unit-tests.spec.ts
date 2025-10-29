import { CombinedWaterHeater } from '../src/combined-water-heater';

describe('Unit tests', () => {
    let heater: CombinedWaterHeater;

    beforeEach(() => {
        console.log('before each');
        // Arrange
        heater = new CombinedWaterHeater('combined water heater');
    });

    describe('Water heater temperature', () => {
        it('default temperature should be 20', () => {

            expect(heater.getCurrentTemperature()).toBe(20);
        });

        it('Heat and check temperature', () => {
            // Arrange
            heater.setTemperature(15);

            // Act
            heater.turnOn();
            heater.setTemperature(35);
            heater.heatWater();

            // Assert
            expect(heater.getCurrentTemperature()).toBe(35);
        });
    });
});
