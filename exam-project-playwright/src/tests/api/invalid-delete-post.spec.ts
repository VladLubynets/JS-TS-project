import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Delete Post API', () => {
    test('should reject with invalid token', async ({ authApi, usersApi, postsApi }) => {
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
            title: 'Test Post',
            body: 'Body of test post',
            select1: 'One Person',
            uniquePost: 'no',
            token,
        });

        const postsResponse = await postsApi.getByUser(username);
        const posts = postsApi.parsePosts(postsResponse.body);
        const postId = posts[0]._id;

        const response = await postsApi.delete(INVALID_VALUE_1CHAR, postId);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');

        await postsApi.delete(token, postId);
        await usersApi.delete(token, userId);
    });

    test('should reject with invalid post id', async ({ authApi, usersApi, postsApi }) => {
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

        const response = await postsApi.delete(token, INVALID_VALUE_1CHAR);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"You do not have permission to perform that action."');

        await usersApi.delete(token, userId);
    });

    test('should reject with both invalid', async ({ postsApi }) => {
        const response = await postsApi.delete(INVALID_VALUE_1CHAR, INVALID_VALUE_1CHAR);

        expect(response.status).toBe(403);
        expect(response.body).toBe('"Sorry, you must provide a valid token."');
    });
});
