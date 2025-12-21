import { test } from '../fixtures/base.fixture';
import { VALID_LOGIN, VALID_PASSWORD, VALID_LOGIN_UPPER_CASE } from '../../test-data/test-data';

test.describe('Valid Login Tests', () => {
    test('should login with valid credentials', async ({ loginPage, homePage }) => {
        await loginPage.open();
        await loginPage.fillUsername(VALID_LOGIN);
        await loginPage.fillPassword(VALID_PASSWORD);
        await loginPage.clickSignIn();
        await loginPage.verifySignInNotVisible();

        await homePage.header.verifySignOutButtonVisible();
    });

    test('should login using keyboard navigation', async ({ loginPage, homePage }) => {
        await loginPage.open();
        await loginPage.fillUsernameAndPress(VALID_LOGIN, 'Tab');
        await loginPage.verifyPasswordPlaceholder('Password');
        await loginPage.fillPasswordAndPress(VALID_PASSWORD, 'Tab');
        await loginPage.pressEnterOnSignIn();
        await loginPage.verifySignInNotVisible();

        await homePage.header.verifyAvatarUsername(VALID_LOGIN);
        await homePage.header.verifySignOutButtonVisible();
    });

    test('should login with uppercase username', async ({ loginPage, homePage }) => {
        await loginPage.open();
        await loginPage.fillUsernameAndPress(VALID_LOGIN_UPPER_CASE, 'Tab');
        await loginPage.fillPasswordAndPress(VALID_PASSWORD, 'Tab');
        await loginPage.pressEnterOnSignIn();
        await loginPage.verifySignInNotVisible();

        await homePage.header.verifyAvatarUsername(VALID_LOGIN);
        await homePage.header.verifySignOutButtonVisible();
    });
});
