import { Given } from '@cucumber/cucumber';
import { RobotDreamsWorld } from '../../worlds/robot-dreams.world.ts';

Given('the user is authenticated', async function(this: RobotDreamsWorld) {
    await this.atlassianLoginPage.goto();
    const workerId = process.env.CUCUMBER_WORKER_ID ? parseInt(process.env.CUCUMBER_WORKER_ID) : 0;
    await this.atlassianLoginPage.login(workerId);
});
