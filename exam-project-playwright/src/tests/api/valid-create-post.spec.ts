import { apiTest as test, expect } from '../fixtures/api.fixture';
import { VALID_LOGIN } from '../../test-data/test-data';
import { CreatePostDto } from '../../api/models/request.dto';

test.describe('Create Post API', () => {
    let token: string;

    test.beforeEach(async ({ apiHelper }) => {
        token = await apiHelper.getToken();
        await apiHelper.deleteAllPosts();
    });

    test('should create and delete post', async ({ apiHelper }) => {
        const postData: CreatePostDto = {
            title: 'Post from API',
            body: 'Body Api',
            select1: 'One Person',
            uniquePost: 'yes',
            token,
        };

        await apiHelper.createPost(postData);

        const posts = await apiHelper.getPostsByUser();
        expect(posts.length).toBe(1);
        expect(posts[0].title).toBe(postData.title);
        expect(posts[0].body).toBe(postData.body);
        expect(posts[0].author.username.toLowerCase()).toBe(VALID_LOGIN.toLowerCase());

        await apiHelper.deletePost(token, posts[0]._id);

        const postsAfterDeletion = await apiHelper.getPostsByUser();
        expect(postsAfterDeletion.length).toBe(0);
    });
});
