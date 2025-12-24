import { test } from '../fixtures/base.fixture';
import { VALID_LOGIN } from '../../test-data/test-data';

test.describe('Save Data Tests', () => {
    test('should preserve data during window resize', async ({ loginPage, homePage }) => {
        await loginPage.fillValidCredentials();

        await loginPage.resizeWindow(500, 500);

        await loginPage.verifyUsernameValue(VALID_LOGIN);

        await loginPage.minimizeWindow();
        await loginPage.maximizeWindow();

        await loginPage.clickSignIn();
        await homePage.header.verifySignOutButtonVisible();
    });

    test('should clear data after page refresh', async ({ loginPage }) => {
        await loginPage.open();
        await loginPage.fillValidCredentials();

        await loginPage.refresh();

        await loginPage.verifyUsernameEmpty();
        await loginPage.verifyPasswordEmpty();
    });
});
