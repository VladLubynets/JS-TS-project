import { apiTest as test, expect } from '../fixtures/api.fixture';
import { VALID_LOGIN, VALID_PASSWORD, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Get Token API', () => {
    test('should return valid token', async ({ apiHelper, page }) => {
        const firstToken = await apiHelper.getToken(VALID_LOGIN, VALID_PASSWORD);
        await page.waitForTimeout(1100);
        const secondToken = await apiHelper.getToken(VALID_LOGIN, VALID_PASSWORD);

        expect(firstToken).toBeTruthy();
        expect(secondToken).toBeTruthy();
        expect(firstToken.length).toBeGreaterThan(50);
        expect(secondToken.length).toBeGreaterThan(50);
    });

    const invalidLoginData = [
        { user: INVALID_VALUE_1CHAR, pass: VALID_PASSWORD, description: 'invalid username' },
        { user: VALID_LOGIN, pass: INVALID_VALUE_1CHAR, description: 'invalid password' },
        { user: '', pass: '', description: 'empty credentials' },
    ];

    for (const data of invalidLoginData) {
        test(`should reject ${data.description}`, async ({ apiHelper }) => {
            await apiHelper.expectInvalidLogin('"Sorry, your values are not correct."', data.user, data.pass);
        });
    }
});
