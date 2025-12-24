import { test } from '../fixtures/base.fixture';
import { Colors } from '../../test-data/color-palette';
import { VALID_PASSWORD } from '../../test-data/test-data';

test.describe('Visual Elements Tests', () => {
    test('should display sign in button correctly', async ({ loginPage }) => {
        await loginPage.open();

        await loginPage.verifySignInButtonText();
        await loginPage.verifySignInButtonColor(Colors.NAVY_BLUE);
        await loginPage.verifySignInButtonTextColor(Colors.WHITE);
    });

    test('should display password input correctly', async ({ loginPage }) => {
        await loginPage.open();

        await loginPage.verifyPasswordInputVisible();
        await loginPage.verifyPasswordPlaceholder('Password');

        await loginPage.fillPasswordAndVerifyCsrfHidden(VALID_PASSWORD);

        await loginPage.copyFromPassword();
        await loginPage.pasteToUsername();
        await loginPage.verifyUsernameEmpty();
    });
});
