import { apiTest as test } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';

test.describe('Invalid Delete Post API', () => {
    let testUsername: string;
    let testPassword: string;
    let testEmail: string;
    let testToken: string;
    let testUserId: string;
    let testPostId: string;

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
            title: 'Test Post for Delete',
            body: 'Body of test post',
            select1: 'One Person',
            uniquePost: 'no',
            token: testToken,
        });

        const posts = await apiHelper.getPostsByUser(testUsername);
        testPostId = posts[0]?._id ?? '';
    });

    test.afterAll(async ({ apiHelper }) => {
        await apiHelper.deleteAllPosts(testUsername, testPassword);
        const freshToken = await apiHelper.getToken(testUsername, testPassword);
        await apiHelper.deleteUser(freshToken, testUserId, testUsername.toLowerCase(), true);
    });

    test('should reject with invalid token', async ({ apiHelper }) => {
        await apiHelper.deletePostExpectError(
            INVALID_VALUE_1CHAR,
            testPostId,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });

    test('should reject with invalid post id', async ({ apiHelper }) => {
        await apiHelper.deletePostExpectError(
            testToken,
            INVALID_VALUE_1CHAR,
            403,
            '"You do not have permission to perform that action."'
        );
    });

    test('should reject with both invalid', async ({ apiHelper }) => {
        await apiHelper.deletePostExpectError(
            INVALID_VALUE_1CHAR,
            INVALID_VALUE_1CHAR,
            403,
            '"Sorry, you must provide a valid token."'
        );
    });
});
