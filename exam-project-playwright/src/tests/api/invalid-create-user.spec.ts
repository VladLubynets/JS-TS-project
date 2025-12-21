import { apiTest as test } from '../fixtures/api.fixture';
import { VALID_LOGIN, INVALID_VALUE_1CHAR, generateRandomString, generateRandomEmail } from '../../test-data/test-data';
import { CreateUserDto } from '../../api/models/request.dto';

test.describe('Invalid Create User API', () => {
    const invalidUserData = [
        {
            username: () => generateRandomString(3),
            password: () => generateRandomString(12),
            email: () => generateRandomEmail(),
            expectedError: '"Sorry, you must provide a valid token."',
            expectedStatus: 403,
            includeToken: false,
            description: 'no token',
        },
        {
            username: () => 'кирилицялогін',
            password: () => generateRandomString(13),
            email: () => generateRandomEmail(),
            expectedError: '["Username can only contain letters and numbers."]',
            expectedStatus: 404,
            includeToken: true,
            description: 'cyrillic username',
        },
        {
            username: () => VALID_LOGIN.toLowerCase(),
            password: () => generateRandomString(43),
            email: () => generateRandomEmail(),
            expectedError: '["This username is already taken."]',
            expectedStatus: 404,
            includeToken: true,
            description: 'existing username',
        },
        {
            username: () => '',
            password: () => '',
            email: () => '',
            expectedError:
                '["You must provide a username.","You must provide a valid email address.","You must provide a password."]',
            expectedStatus: 404,
            includeToken: true,
            description: 'all empty values',
        },
        {
            username: () => INVALID_VALUE_1CHAR,
            password: () => INVALID_VALUE_1CHAR,
            email: () => INVALID_VALUE_1CHAR,
            expectedError:
                '["You must provide a valid email address.","Password must be at least 12 characters.","Username must be at least 3 characters."]',
            expectedStatus: 404,
            includeToken: true,
            description: 'all invalid short values',
        },
        {
            username: () => generateRandomString(31),
            password: () => generateRandomString(51),
            email: () => generateRandomEmail(),
            expectedError: '["Password cannot exceed 50 characters.","Username cannot exceed 30 characters."]',
            expectedStatus: 404,
            includeToken: true,
            description: 'values exceed max length',
        },
    ];

    for (const data of invalidUserData) {
        test(`should reject user with ${data.description}`, async ({ apiHelper }) => {
            const token = data.includeToken ? await apiHelper.getToken() : '';

            const userData: CreateUserDto = {
                username: data.username(),
                password: data.password(),
                email: data.email(),
                token,
            };

            await apiHelper.createUserExpectError(userData, data.expectedStatus, data.expectedError);
        });
    }
});
