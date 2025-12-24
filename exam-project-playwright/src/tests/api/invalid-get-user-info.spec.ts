import { apiTest as test, expect } from '../fixtures/api.fixture';
import { VALID_LOGIN, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Get User Info API', () => {
    test('should reject with invalid token', async ({ usersApi }) => {
        const response = await usersApi.getInfo(VALID_LOGIN.toLowerCase(), INVALID_VALUE_1CHAR);
        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');
    });

    test('should reject with invalid username', async ({ authApi, usersApi }) => {
        const tokenResponse = await authApi.login();
        expect(tokenResponse.status).toBe(200);
        const token = authApi.parseToken(tokenResponse.body);

        const response = await usersApi.getInfo(INVALID_VALUE_1CHAR, token);
        expect(response.status).toBe(400);
        expect(response.body).toBe(`"No user ${INVALID_VALUE_1CHAR} was found"`);
    });

    test('should reject with both invalid', async ({ usersApi }) => {
        const response = await usersApi.getInfo(INVALID_VALUE_1CHAR, INVALID_VALUE_1CHAR);
        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');
    });
});
