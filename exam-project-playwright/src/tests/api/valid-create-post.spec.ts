import { apiTest as test, expect } from '../fixtures/api.fixture';
import { VALID_LOGIN } from '../../test-data/test-data';
import { CreatePostDto } from '../../api/models/request.dto';

test.describe('Create Post API', () => {
    let token: string;

    test.beforeEach(async ({ authApi, postsApi }) => {
        const tokenResponse = await authApi.login();
        expect(tokenResponse.status).toBe(200);
        token = authApi.parseToken(tokenResponse.body);

        const postsResponse = await postsApi.getByUser();
        const posts = postsApi.parsePosts(postsResponse.body);
        for (const post of posts) {
            const deleteResponse = await postsApi.delete(token, post._id);
            expect(deleteResponse.status).toBe(200);
        }
    });

    test('should create and delete post', async ({ postsApi }) => {
        const postData: CreatePostDto = {
            title: 'Post from API',
            body: 'Body Api',
            select1: 'One Person',
            uniquePost: 'yes',
            token,
        };

        const createResponse = await postsApi.create(postData);
        expect(createResponse.status).toBe(200);
        expect(createResponse.body).toBe('"Congrats."');

        const postsResponse = await postsApi.getByUser();
        expect(postsResponse.status).toBe(200);
        const posts = postsApi.parsePosts(postsResponse.body);

        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe(postData.title);
        expect(posts[0].body).toBe(postData.body);
        expect(posts[0].author.username.toLowerCase()).toBe(VALID_LOGIN.toLowerCase());

        const deleteResponse = await postsApi.delete(token, posts[0]._id);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body).toBe('"Success"');

        const postsAfterDeletion = await postsApi.getByUser();
        const postsAfter = postsApi.parsePosts(postsAfterDeletion.body);
        expect(postsAfter.length).toBe(0);
    });
});
