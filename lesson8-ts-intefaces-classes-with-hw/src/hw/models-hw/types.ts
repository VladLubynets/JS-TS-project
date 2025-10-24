
export interface Device {
    id: string;
    name: string;
    data: IDeviceData | null;
}

export interface IDeviceData {
    color?: string;
    capacity?: string;
    price?: number;
    [key: string]: unknown;
}

export interface IDeviceSummary {
    title: string;
    hasCapacity: boolean;
    hasPrice: boolean;
    hasColor: boolean;
    totalValue: number;
}
