import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { RobotDreamsWorld } from './worlds/robot-dreams.world.ts';

setDefaultTimeout(999999999);
setWorldConstructor(RobotDreamsWorld);
