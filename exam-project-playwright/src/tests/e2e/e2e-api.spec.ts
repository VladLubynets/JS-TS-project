import { apiTest as test, expect } from '../fixtures/api.fixture';
import { generateRandomString, generateRandomEmail, INVALID_VALUE_1CHAR } from '../../test-data/test-data';
import { CreatePostDto } from '../../api/models/request.dto';

test.describe('E2E Scenario by API', () => {
    test('full user lifecycle: create, post, delete', async ({ authApi, usersApi, postsApi }) => {
        const tokenResponse = await authApi.login();
        expect(tokenResponse.status).toBe(200);
        const token = authApi.parseToken(tokenResponse.body);

        const username = generateRandomString(10);
        const password = generateRandomString(12);
        const email = generateRandomEmail();

        const createUserResponse = await usersApi.create({ username, password, email, token });
        expect(createUserResponse.status).toBe(201);

        const invalidUserResponse = await usersApi.getInfo(INVALID_VALUE_1CHAR, token);
        expect(invalidUserResponse.status).toBe(400);
        expect(invalidUserResponse.body).toBe(`"No user ${INVALID_VALUE_1CHAR} was found"`);

        const invalidTokenResponse = await usersApi.getInfo(username.toLowerCase(), INVALID_VALUE_1CHAR);
        expect(invalidTokenResponse.status).toBe(403);
        expect(invalidTokenResponse.body).toBe('"Sorry, you must provide a valid token."');

        const userInfoResponse = await usersApi.getInfo(username.toLowerCase(), token);
        expect(userInfoResponse.status).toBe(200);
        const userInfo = usersApi.parseUserInfo(userInfoResponse.body);
        const userId = userInfo._id;

        const newTokenResponse = await authApi.login(username, password);
        expect(newTokenResponse.status).toBe(200);
        const newToken = authApi.parseToken(newTokenResponse.body);

        const postData: CreatePostDto = {
            title: 'Post from API E2E',
            body: 'Body Api E2E',
            select1: 'One Person',
            uniquePost: 'no',
            token: newToken,
        };
        const createPostResponse = await postsApi.create(postData);
        expect(createPostResponse.status).toBe(200);

        const invalidPostsResponse = await postsApi.getByUser(INVALID_VALUE_1CHAR);
        const invalidPosts = postsApi.parsePosts(invalidPostsResponse.body);
        expect(invalidPosts).toEqual([]);

        const postsResponse = await postsApi.getByUser(username);
        const posts = postsApi.parsePosts(postsResponse.body);
        expect(posts.length).toBeGreaterThan(0);
        const postId = posts[0]?._id ?? '';

        const deleteUserWithPostsResponse = await usersApi.delete(newToken, userId);
        expect(deleteUserWithPostsResponse.status).toBe(400);
        expect(deleteUserWithPostsResponse.body).toBe(
            `"Number of posts of this user is ${posts.length}. We can not delete user with posts."`
        );

        const invalidDeleteUserIdResponse = await usersApi.delete(newToken, INVALID_VALUE_1CHAR);
        expect(invalidDeleteUserIdResponse.status).toBe(403);
        expect(invalidDeleteUserIdResponse.body).toBe('"You do not have permission to perform that action."');

        const invalidDeleteUserTokenResponse = await usersApi.delete(INVALID_VALUE_1CHAR, userId);
        expect(invalidDeleteUserTokenResponse.status).toBe(403);
        expect(invalidDeleteUserTokenResponse.body).toBe('"Sorry, you must provide a valid token."');

        const invalidDeletePostTokenResponse = await postsApi.delete(INVALID_VALUE_1CHAR, postId);
        expect(invalidDeletePostTokenResponse.status).toBe(403);
        expect(invalidDeletePostTokenResponse.body).toBe('"Sorry, you must provide a valid token."');

        const invalidDeletePostIdResponse = await postsApi.delete(newToken, INVALID_VALUE_1CHAR);
        expect(invalidDeletePostIdResponse.status).toBe(403);
        expect(invalidDeletePostIdResponse.body).toBe('"You do not have permission to perform that action."');

        for (const post of posts) {
            const deletePostResponse = await postsApi.delete(newToken, post._id);
            expect(deletePostResponse.status).toBe(200);
        }

        const postsAfterDeleteResponse = await postsApi.getByUser(username);
        const postsAfterDelete = postsApi.parsePosts(postsAfterDeleteResponse.body);
        expect(postsAfterDelete.length).toBe(0);

        const deleteUserResponse = await usersApi.delete(newToken, userId);
        expect(deleteUserResponse.status).toBe(200);
        expect(deleteUserResponse.body).toBe(`"User with id ${userId} was deletted "`);

        const loginResponse = await authApi.login(username, password);
        expect(loginResponse.body).toBe('"Sorry, your values are not correct."');
    });
});
