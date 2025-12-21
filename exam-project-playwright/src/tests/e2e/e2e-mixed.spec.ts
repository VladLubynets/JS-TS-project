import { test, expect } from '../fixtures/mixed.fixture';
import { generateRandomString, generateRandomEmail } from '../../test-data/test-data';

test.describe('E2E Mixed UI and API', () => {
    test('register via UI, verify via API, delete via API', async ({ loginPage, homePage, apiHelper }) => {
        const username = generateRandomString(10);
        const password = generateRandomString(10) + '123qwerty';
        const email = generateRandomEmail();

        await loginPage.register(username, password, email);

        const token = await apiHelper.getToken(username, password);
        expect(token).toBeTruthy();
        expect(token.length).toBeGreaterThan(50);

        const userInfo = await apiHelper.getUserInfo(username.toLowerCase(), token);
        const userId = userInfo._id;
        expect(userInfo.username).toBe(username.toLowerCase());
        expect(userInfo.email).toBe(email);

        await loginPage.login(username, password);
        await homePage.header.verifySignOutButtonVisible();

        await apiHelper.deleteUser(token, userId, username.toLowerCase(), true);
        await apiHelper.expectInvalidLogin('"Sorry, your values are not correct."', username, password);
    });

    test('create user via API, login via UI, manage posts via API', async ({ loginPage, homePage, apiHelper }) => {
        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        const masterToken = await apiHelper.getToken();
        await apiHelper.createUser(username, password, email, masterToken);

        await loginPage.login(username, password);
        await homePage.header.verifySignOutButtonVisible();

        const userToken = await apiHelper.getToken(username, password);
        const userInfo = await apiHelper.getUserInfo(username.toLowerCase(), userToken);
        const userId = userInfo._id;

        await apiHelper.createPost({
            title: 'E2E Post via API',
            body: 'This post was created via API during E2E test',
            select1: 'One Person',
            uniquePost: 'no',
            token: userToken,
        });

        const posts = await apiHelper.getPostsByUser(username);
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe('E2E Post via API');

        await apiHelper.deletePost(userToken, posts[0]._id);

        const postsAfterDelete = await apiHelper.getPostsByUser(username);
        expect(postsAfterDelete.length).toBe(0);

        await apiHelper.deleteUser(userToken, userId, username.toLowerCase(), true);
        await apiHelper.expectInvalidLogin('"Sorry, your values are not correct."', username, password);
    });
});
