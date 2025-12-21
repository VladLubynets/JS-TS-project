import { apiTest as test } from '../fixtures/api.fixture';
import { VALID_LOGIN, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Get User Info API', () => {
    test('should reject with invalid token', async ({ apiHelper }) => {
        await apiHelper.getUserInfoExpectError(
            VALID_LOGIN.toLowerCase(),
            INVALID_VALUE_1CHAR,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });

    test('should reject with invalid username', async ({ apiHelper }) => {
        const token = await apiHelper.getToken();
        await apiHelper.getUserInfoExpectError(
            INVALID_VALUE_1CHAR,
            token,
            400,
            `"No user ${INVALID_VALUE_1CHAR} was found"`
        );
    });

    test('should reject with both invalid', async ({ apiHelper }) => {
        await apiHelper.getUserInfoExpectError(
            INVALID_VALUE_1CHAR,
            INVALID_VALUE_1CHAR,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });
});
