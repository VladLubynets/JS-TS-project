import { BrowserContextOptions, chromium } from 'playwright';
import * as fs from 'fs';

export default async function (): Promise<void> {
    // Skip setup for hw tests - check if test file path includes 'hw'
    const testFiles = process.env.VITEST_TEST_FILES || '';
    if (testFiles.includes('hw/tests') || testFiles.includes('hw\\tests')) {
        return;
    }

    const { world } = await import('./vitest-global-setup');
    const config = world.configService.getConfig();

    if (config.auth.rdApi.token) {
        return;
    }

    const browser = await chromium.launch({ headless: false });

    const browserOptions: BrowserContextOptions = {};
    const storageStatePath = 'storage-state.json';
    if (fs.existsSync(storageStatePath)) {
        browserOptions.storageState = storageStatePath;
    }
    const browserContext = await browser.newContext(browserOptions);

    const page = await browserContext.newPage();

    const tokenResponse = page.waitForRequest((request) =>
        request.url().includes('https://lms.academius.io/api/graphql')
    );

    await page.goto(config.api.rd.loginUrl, { waitUntil: 'domcontentloaded' });

    const loginButton = page.locator('button[type="submit"]');
    const emailInput = page.locator('#email');
    await emailInput.waitFor({ state: 'visible', timeout: 5000 });
    if (await emailInput.isVisible()) {
        await emailInput.fill(config.auth.rdApi.userName);
        await page.locator('#password').fill(config.auth.rdApi.password);
        await loginButton.click();
    }

    const request = await tokenResponse;

    const headers = request.headers();
    const token = headers['authorization'].replace('Bearer ', '');

    await page.context().storageState({ path: storageStatePath });

    world.configService.updateJwtToken(token);

    await page.close();
    await browserContext.close();
    await browser.close();
};
