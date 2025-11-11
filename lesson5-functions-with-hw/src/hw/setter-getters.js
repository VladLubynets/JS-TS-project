import { Smartphone } from './phone-models/smartphones.js';

const phone = new Smartphone('Samsung', 'Galaxy S23', 256, 5000);

console.log('Before update:');
console.log(phone.getSummary());

phone.brand = 'Apple';
phone.model = 'iPhone 15 Pro';
phone.memory = 512;
phone.battery = 4800;

console.log('After update:');
console.log(phone.getSummary());
