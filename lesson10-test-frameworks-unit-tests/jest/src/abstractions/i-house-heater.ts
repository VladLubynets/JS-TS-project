export interface IHouseHeater {
    heatTemperature: number
    heatHouse(): void;
    setHouseHeaterTemperature(tem: number): number;
}
