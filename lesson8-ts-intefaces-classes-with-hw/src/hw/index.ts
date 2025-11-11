import { getDevicesAsClasses } from './services-hw/api';
import { DeviceSummaryClass } from './models-hw/summary';
import { Phone, Laptop } from './abstraction-hw/devices';
import { IDeviceSummary } from './models-hw/types';

async function main(): Promise<void> {
    console.log('Getting devices from API');
    const devices = await getDevicesAsClasses();

    devices.forEach((device) => {
        console.log(device.getInfo());
    });

    console.log('--------------------------------\n');

    console.log('Creating summary objects');
    const summaries = devices.map((device) => new DeviceSummaryClass(device));

    summaries.forEach((summary) => {
        console.log(summary.getDescription());
    });

    console.log('-----------------------------\n');

    console.log('Short info');
    summaries.forEach((summary) => {
        console.log(summary.getShortInfo());
    });

    console.log('-----------------------------\n');

    console.log('Abstraction demo');
    const myPhone = new Phone('Samsung', 'Galaxy S24', 5000);
    const myLaptop = new Laptop('Lenovo', 'ThinkPad X1', 32);

    console.log(myPhone.getDescription());
    console.log(myLaptop.getDescription());
    console.log('Full name (laptop):', myLaptop.getFullName());

    console.log('-----------------------------\n');

    console.log('Interface demo');
    const summaryObjects: IDeviceSummary[] = summaries.map((s) => s.toSimpleObject());
    console.log('First 2 objects:', summaryObjects.slice(0, 2));
}

main();
