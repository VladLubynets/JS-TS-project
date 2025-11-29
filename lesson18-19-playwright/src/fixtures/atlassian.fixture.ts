import { test as base, Browser } from '@playwright/test';
import { JiraPage } from '../pages/jira.page';
import { AtlassianLoginPage } from '../pages/atlassian-login.page';
import * as fs from 'fs';
import { ConfigService } from '../services/config.service';

interface AtlassianFixture {
    jiraPage: JiraPage;
    configService: ConfigService;
}

const storageState = (workerId: number): string => `.auth/storage-state-${workerId}.json`;

export const test = base.extend<AtlassianFixture>({
    jiraPage: async ({ browser, configService }, use) => {
        const workerId = test.info().workerIndex;
        await authenticateJira(browser, workerId, configService);

        const context = await browser.newContext({
            storageState: storageState(workerId),
            recordVideo: {
                dir: 'test-results/videos'
            }
        });
        const page = await context.newPage();
        const jiraPage = new JiraPage(page, configService.config.uiConfig.jiraBaseUrl);
        await use(jiraPage);

        // disposal
        await page.close();
        await context.close();
    },
    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        await use(configService);
    }
});

async function authenticateJira(browser: Browser, workerId: number, configService: ConfigService): Promise<void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const atlassianLoginPage = new AtlassianLoginPage(page, configService);
    await atlassianLoginPage.login(workerId);
    await page.context().storageState({ path: storageState(workerId) });
    await context.close();
}
