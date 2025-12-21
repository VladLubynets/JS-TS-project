import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Delete User API', () => {
    let testUsername: string;
    let testPassword: string;
    let testEmail: string;
    let testToken: string;
    let testUserId: string;

    test.beforeAll(async ({ apiHelper }) => {
        const masterToken = await apiHelper.getToken();

        testUsername = generateRandomString(10);
        testPassword = generateRandomString(12);
        testEmail = generateRandomEmail();

        await apiHelper.createUser(testUsername, testPassword, testEmail, masterToken);
        testToken = await apiHelper.getToken(testUsername, testPassword);

        const userInfo = await apiHelper.getUserInfo(testUsername.toLowerCase(), testToken);
        testUserId = userInfo._id;

        await apiHelper.createPost({
            title: 'Test Post 1',
            body: 'Body of test post 1',
            select1: 'One Person',
            uniquePost: 'no',
            token: testToken,
        });
        await apiHelper.createPost({
            title: 'Test Post 2',
            body: 'Body of test post 2',
            select1: 'One Person',
            uniquePost: 'no',
            token: testToken,
        });
    });

    test.afterAll(async ({ apiHelper }) => {
        await apiHelper.deleteAllPosts(testUsername, testPassword);
        const freshToken = await apiHelper.getToken(testUsername, testPassword);
        await apiHelper.deleteUser(freshToken, testUserId, testUsername.toLowerCase(), true);
    });

    test('should reject with invalid token', async ({ apiHelper }) => {
        await apiHelper.deleteUserExpectError(
            INVALID_VALUE_1CHAR,
            testUserId,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });

    test('should reject deleting user with posts', async ({ apiHelper }) => {
        const posts = await apiHelper.getPostsByUser(testUsername);
        expect(posts.length).toBeGreaterThan(0);

        await apiHelper.deleteUserExpectError(
            testToken,
            testUserId,
            400,
            `"Number of posts of this user is ${posts.length}. We can not delete user with posts."`
        );
    });

    test('should reject with both invalid', async ({ apiHelper }) => {
        await apiHelper.deleteUserExpectError(
            INVALID_VALUE_1CHAR,
            INVALID_VALUE_1CHAR,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });

    test('should reject with invalid user id', async ({ apiHelper }) => {
        await apiHelper.deleteUserExpectError(
            testToken,
            INVALID_VALUE_1CHAR,
            403,
            '"You do not have permission to perform that action."'
        );
    });
});
