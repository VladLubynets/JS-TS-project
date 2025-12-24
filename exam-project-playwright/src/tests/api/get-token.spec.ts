import { apiTest as test, expect } from '../fixtures/api.fixture';
import { VALID_LOGIN, VALID_PASSWORD, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Get Token API', () => {
    test('should return valid token', async ({ authApi, page }) => {
        const firstResponse = await authApi.login(VALID_LOGIN, VALID_PASSWORD);
        await page.waitForTimeout(1100);
        const secondResponse = await authApi.login(VALID_LOGIN, VALID_PASSWORD);

        expect(firstResponse.status).toBe(200);
        expect(secondResponse.status).toBe(200);

        const firstToken = authApi.parseToken(firstResponse.body);
        const secondToken = authApi.parseToken(secondResponse.body);

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
        test(`should reject ${data.description}`, async ({ authApi }) => {
            const response = await authApi.login(data.user, data.pass);
            expect(response.body).toBe('"Sorry, your values are not correct."');
        });
    }
});
