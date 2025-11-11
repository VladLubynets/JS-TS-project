import { Device } from './types';

export class DeviceClass {
    id: string;
    name: string;
    color: string | null;
    capacity: string | null;
    price: number | null;

    constructor(deviceData: Device) {
        this.id = deviceData.id;
        this.name = deviceData.name;
        this.color = deviceData.data?.color || null;
        this.capacity = deviceData.data?.capacity || null;
        this.price = deviceData.data?.price || null;
    }

    hasCapacity(): boolean {
        return this.capacity !== null;
    }

    getInfo(): string {
        return `Device "${this.name}" (id=${this.id}) color=${this.color || 'n/a'} capacity=${this.capacity || 'n/a'} price=${this.price || 'n/a'}`;
    }
}
