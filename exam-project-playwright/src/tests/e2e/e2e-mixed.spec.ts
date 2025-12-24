import { test, expect } from '../fixtures/mixed.fixture';
import { generateRandomString, generateRandomEmail } from '../../test-data/test-data';

test.describe('E2E Mixed UI and API', () => {
    test('register via UI, verify via API, delete via API', async ({ loginPage, homePage, authApi, usersApi }) => {
        const username = generateRandomString(10);
        const password = generateRandomString(10) + '123qwerty';
        const email = generateRandomEmail();

        await loginPage.register(username, password, email);

        const tokenResponse = await authApi.login(username, password);
        expect(tokenResponse.status).toBe(200);
        const token = authApi.parseToken(tokenResponse.body);
        expect(token).toBeTruthy();
        expect(token.length).toBeGreaterThan(50);

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        expect(userInfoResponse.status).toBe(200);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;
        expect(userInfo.username).toBe(username.toLowerCase());
        expect(userInfo.email).toBe(email);

        await loginPage.login(username, password);
        await homePage.header.verifySignOutButtonVisible();

        const deleteResponse = await usersApi.delete(token, userId);
        expect(deleteResponse.status).toBe(200);

        const loginResponseAfterDelete = await authApi.login(username, password);
        expect(loginResponseAfterDelete.body).toBe('"Sorry, your values are not correct."');
    });

    test('create user via API, login via UI, manage posts via API', async ({
        loginPage,
        homePage,
        authApi,
        usersApi,
        postsApi,
    }) => {
        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        const masterTokenResponse = await authApi.login();
        expect(masterTokenResponse.status).toBe(200);
        const masterToken = authApi.parseToken(masterTokenResponse.body);

        const createUserResponse = await usersApi.create({ username, password, email, token: masterToken });
        expect(createUserResponse.status).toBe(201);

        await loginPage.login(username, password);
        await homePage.header.verifySignOutButtonVisible();

        const userTokenResponse = await authApi.login(username, password);
        expect(userTokenResponse.status).toBe(200);
        const userToken = authApi.parseToken(userTokenResponse.body);

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), userToken);
        expect(userInfoResponse.status).toBe(200);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        const createPostResponse = await postsApi.create({
            title: 'E2E Post via API',
            body: 'This post was created via API during E2E test',
            select1: 'One Person',
            uniquePost: 'no',
            token: userToken,
        });
        expect(createPostResponse.status).toBe(200);

        const postsResponse = await postsApi.getByUser(username);
        const posts = postsApi.parsePosts(postsResponse.body);
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe('E2E Post via API');

        const deletePostResponse = await postsApi.delete(userToken, posts[0]._id);
        expect(deletePostResponse.status).toBe(200);

        const postsAfterDeleteResponse = await postsApi.getByUser(username);
        const postsAfterDelete = postsApi.parsePosts(postsAfterDeleteResponse.body);
        expect(postsAfterDelete.length).toBe(0);

        const deleteUserResponse = await usersApi.delete(userToken, userId);
        expect(deleteUserResponse.status).toBe(200);

        const loginResponseAfterDelete = await authApi.login(username, password);
        expect(loginResponseAfterDelete.body).toBe('"Sorry, your values are not correct."');
    });
});
