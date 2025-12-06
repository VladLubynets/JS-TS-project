import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { SauceDemoWorld } from './worlds/saucedemo.world.ts';

setDefaultTimeout(60000);
setWorldConstructor(SauceDemoWorld);
