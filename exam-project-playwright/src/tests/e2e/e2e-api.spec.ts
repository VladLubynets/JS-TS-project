import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';
import { CreatePostDto } from '../../api/models/request.dto';

test.describe('E2E Scenario by API', () => {
    test('full user lifecycle: create, post, delete', async ({ apiHelper }) => {
        const token = await apiHelper.getToken();
        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

  
        await apiHelper.createUser(username, password, email, token);


        await apiHelper.getUserInfoExpectError(
            INVALID_VALUE_1CHAR,
            token,
            400,
            `"No user ${INVALID_VALUE_1CHAR} was found"`
        );

        await apiHelper.getUserInfoExpectError(
            username.toLowerCase(),
            INVALID_VALUE_1CHAR,
            403,
            '"Sorry, you must provide a valid token."'
        );

   
        const userInfo = await apiHelper.getUserInfo(username.toLowerCase(), token);
        const userId = userInfo._id;

        const newToken = await apiHelper.getToken(username, password);


        const postData: CreatePostDto = {
            title: 'Post from API E2E',
            body: 'Body Api E2E',
            select1: 'One Person',
            uniquePost: 'no',
            token: newToken,
        };
        await apiHelper.createPost(postData);


        const invalidPosts = await apiHelper.getPostsByUser(INVALID_VALUE_1CHAR);
        expect(invalidPosts).toEqual([]);

        const posts = await apiHelper.getPostsByUser(username);
        expect(posts.length).toBeGreaterThan(0);
        const postId = posts[0]?._id ?? '';

        await apiHelper.deleteUser(newToken, userId, username.toLowerCase(), false);


        await apiHelper.deleteUserExpectError(
            newToken,
            INVALID_VALUE_1CHAR,
            403,
            '"You do not have permission to perform that action."'
        );


        await apiHelper.deleteUserExpectError(
            INVALID_VALUE_1CHAR,
            userId,
            403,
            '"Sorry, you must provide a valid token."'
        );

        await apiHelper.deletePostExpectError(
            INVALID_VALUE_1CHAR,
            postId,
            403,
            '"Sorry, you must provide a valid token."'
        );

        await apiHelper.deletePostExpectError(
            newToken,
            INVALID_VALUE_1CHAR,
            403,
            '"You do not have permission to perform that action."'
        );

        await apiHelper.deleteAllPosts(username, password);

        await apiHelper.deleteUser(newToken, userId, username.toLowerCase(), true);

        await apiHelper.expectInvalidLogin('"Sorry, your values are not correct."', username, password);
    });
});
