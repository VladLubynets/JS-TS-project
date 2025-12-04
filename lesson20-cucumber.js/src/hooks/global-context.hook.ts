import { BeforeAll } from '@cucumber/cucumber';
import { RobotDreamsWorld } from '../worlds/robot-dreams.world.ts';

export function globalContextHook(): void {
    BeforeAll(function() {
        RobotDreamsWorld.globalContext = new Map();
    });
}
