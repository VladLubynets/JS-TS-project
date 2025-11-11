import { DeviceClass } from './device';
import { IDeviceSummary } from './types';

export class DeviceSummaryClass {
    title: string;
    hasCapacity: boolean;
    hasPrice: boolean;
    hasColor: boolean;
    totalValue: number;

    constructor(device: DeviceClass) {
        this.title = device.name.toUpperCase();
        this.hasCapacity = device.hasCapacity();
        this.hasPrice = device.price !== null;
        this.hasColor = device.color !== null;
        this.totalValue = device.price || 0;
    }

    getDescription(): string {
        return `Summary: ${this.title}, capacity: ${this.hasCapacity ? 'YES' : 'NO'}, price: ${this.hasPrice ? 'YES' : 'NO'}, color: ${this.hasColor ? 'YES' : 'NO'}`;
    }

    getShortInfo(): string {
        return `${this.title} - ${this.hasPrice ? `$${this.totalValue}` : 'No price'}`;
    }

    toSimpleObject(): IDeviceSummary {
        return {
            title: this.title,
            hasCapacity: this.hasCapacity,
            hasPrice: this.hasPrice,
            hasColor: this.hasColor,
            totalValue: this.totalValue
        };
    }
}
