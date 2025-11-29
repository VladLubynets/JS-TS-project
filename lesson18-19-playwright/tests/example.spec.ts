import { expect } from '@playwright/test';
import { AtlassianLoginPage } from '../src/pages/atlassian-login.page';
import { test } from '../src/fixtures/atlassian.fixture';

test.describe('simple pom example', () => {
    test('has title', async ({ page, configService }) => {
        const atlassianLoginPage = new AtlassianLoginPage(page, configService);
        await atlassianLoginPage.login(test.info().workerIndex);

        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle('Collaboration software for software, IT and business teams | Atlassian');
    });
});
