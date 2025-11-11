import { Device } from '../models-hw/types';
import { DeviceClass } from '../models-hw/device';

export async function getDevicesFromApi(): Promise<Device[]> {
    const response = await fetch('https://api.restful-api.dev/objects');
    const data = await response.json();
    return data as Device[];
}

export async function getDevicesAsClasses(): Promise<DeviceClass[]> {
    const devicesData = await getDevicesFromApi();
    return devicesData.map(data => new DeviceClass(data));
}
