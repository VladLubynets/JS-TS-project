import { AfterAll, BeforeAll, Before, After } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { SauceDemoWorld } from '../worlds/saucedemo.world.ts';

BeforeAll(async function () {
    SauceDemoWorld.browser = await chromium.launch({ headless: false });
});

AfterAll(async function () {
    await SauceDemoWorld.browser.close();
});

Before(async function (this: SauceDemoWorld) {
    this.context = await SauceDemoWorld.browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
});

After(async function (this: SauceDemoWorld) {
    await this.page.close();
    await this.context.close();
});
