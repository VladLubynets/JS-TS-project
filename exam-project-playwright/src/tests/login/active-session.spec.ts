import { test } from '../fixtures/base.fixture';
import { LoginPage } from '../../pages/login.page';

test.describe('Active Session Tests', () => {
    test('should persist session in new tab', async ({ loginPage, context }) => {
        await loginPage.loginWithDefaults();

        const newPage = await context.newPage();
        const newLoginPage = new LoginPage(newPage);
        await newPage.goto(newLoginPage.baseUrl);

        await newLoginPage.verifySignInNotVisible();
    });
});
