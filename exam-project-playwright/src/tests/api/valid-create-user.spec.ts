import { apiTest as test } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail } from '../../test-data/test-data';

test.describe('Create User API', () => {
    test('should create and delete user', async ({ apiHelper }) => {
        const token = await apiHelper.getToken();
        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        await apiHelper.createUser(username, password, email, token);

        const userInfo = await apiHelper.getUserInfo(username.toLowerCase(), token);
        const userId = userInfo._id;

        await apiHelper.deleteUser(token, userId, username.toLowerCase(), true);

        await apiHelper.expectInvalidLogin('"Sorry, your values are not correct."', username, password);
    });
});
