import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail } from '../../test-data/test-data';

test.describe('Create User API', () => {
    test('should create and delete user', async ({ authApi, usersApi }) => {
        const tokenResponse = await authApi.login();
        expect(tokenResponse.status).toBe(200);
        const token = authApi.parseToken(tokenResponse.body);

        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        const createResponse = await usersApi.create({ username, password, email, token });
        expect(createResponse.status).toBe(201);
        expect(createResponse.body).toBe('"Congrats. You created new user"');

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        expect(userInfoResponse.status).toBe(200);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        const deleteResponse = await usersApi.delete(token, userId);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toBe(`"User with id ${userId} was deletted "`);

        const loginResponse = await authApi.login(username, password);
        expect(loginResponse.body).toBe('"Sorry, your values are not correct."');
    });
});
