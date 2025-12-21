import { test } from '../fixtures/base.fixture';
import { VALID_LOGIN, VALID_PASSWORD, INVALID_LOGIN, INVALID_PASSWORD } from '../../test-data/test-data';
import { Colors } from '../../test-data/color-palette';

test.describe('Invalid Login Tests', () => {
    const invalidLoginData = [
        { userName: VALID_LOGIN, password: INVALID_PASSWORD, description: 'valid login + invalid password' },
        { userName: INVALID_LOGIN, password: VALID_PASSWORD, description: 'invalid login + valid password' },
    ];

    for (const data of invalidLoginData) {
        test(`should show error for ${data.description}`, async ({ loginPage }) => {
            await loginPage.open();
            await loginPage.verifyAlertNotVisible();
            await loginPage.fillUsername(data.userName);
            await loginPage.verifyPasswordPlaceholder('Password');
            await loginPage.fillPassword(data.password);
            await loginPage.clickSignIn();
            await loginPage.verifyAlertVisible();
            await loginPage.verifyAlertText('Invalid username/password.');
            await loginPage.verifyAlertBackgroundColor(Colors.PINK);
        });
    }

    const keyboardInvalidLoginData = [
        { userName: VALID_PASSWORD, password: VALID_LOGIN, description: 'swapped credentials' },
        { userName: '', password: '', description: 'empty credentials' },
    ];

    for (const data of keyboardInvalidLoginData) {
        test(`should show error with keyboard for ${data.description}`, async ({ loginPage }) => {
            await loginPage.open();
            await loginPage.verifyAlertNotVisible();
            await loginPage.fillUsernameAndPress(data.userName, 'Tab');
            await loginPage.fillPasswordAndPress(data.password, 'Tab');
            await loginPage.pressEnterOnSignIn();
            await loginPage.verifyAlertVisible();
            await loginPage.verifyAlertText('Invalid username/password.');
            await loginPage.verifyAlertBackgroundColor(Colors.PINK);

            await loginPage.refresh();
            await loginPage.verifyAlertNotVisible();
        });
    }
});
