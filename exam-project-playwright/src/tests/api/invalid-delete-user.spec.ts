import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Delete User API', () => {
    test('should reject with invalid token', async ({ authApi, usersApi }) => {
        const masterTokenResponse = await authApi.login();
        const masterToken = authApi.parseToken(masterTokenResponse.body);

        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        await usersApi.create({ username, password, email, token: masterToken });

        const tokenResponse = await authApi.login(username, password);
        const token = authApi.parseToken(tokenResponse.body);

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        const response = await usersApi.delete(INVALID_VALUE_1CHAR, userId);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');

        await usersApi.delete(token, userId);
    });

    test('should reject deleting user with posts', async ({ authApi, usersApi, postsApi }) => {
        const masterTokenResponse = await authApi.login();
        const masterToken = authApi.parseToken(masterTokenResponse.body);

        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        await usersApi.create({ username, password, email, token: masterToken });

        const tokenResponse = await authApi.login(username, password);
        const token = authApi.parseToken(tokenResponse.body);

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        await postsApi.create({
            title: 'Test Post 1',
            body: 'Body of test post 1',
            select1: 'One Person',
            uniquePost: 'no',
            token,
        });

        await postsApi.create({
            title: 'Test Post 2',
            body: 'Body of test post 2',
            select1: 'One Person',
            uniquePost: 'no',
            token,
        });

        const postsResponse = await postsApi.getByUser(username);
        const posts = postsApi.parsePosts(postsResponse.body);

        const response = await usersApi.delete(token, userId);

        expect(response.status).toBe(400);
        expect(response.body).toBe(
            `"Number of posts of this user is ${posts.length}. We can not delete user with posts."`
        );

        for (const post of posts) {
            await postsApi.delete(token, post._id);
        }
        await usersApi.delete(token, userId);
    });

    test('should reject with both invalid', async ({ usersApi }) => {
        const response = await usersApi.delete(INVALID_VALUE_1CHAR, INVALID_VALUE_1CHAR);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');
    });

    test('should reject with invalid user id', async ({ authApi, usersApi }) => {
        const masterTokenResponse = await authApi.login();
        const masterToken = authApi.parseToken(masterTokenResponse.body);

        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        await usersApi.create({ username, password, email, token: masterToken });

        const tokenResponse = await authApi.login(username, password);
        const token = authApi.parseToken(tokenResponse.body);

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        const response = await usersApi.delete(token, INVALID_VALUE_1CHAR);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"You do not have permission to perform that action."');

        await usersApi.delete(token, userId);
    });
});
