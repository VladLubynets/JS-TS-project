import { apiTest as test, expect } from '../fixtures/api.fixture';
import { CreatePostDto } from '../../api/models/request.dto';

test.describe('Invalid Create Post API', () => {
    let token: string;

    test.beforeEach(async ({ authApi }) => {
        const tokenResponse = await authApi.login();
        expect(tokenResponse.status).toBe(200);
        token = authApi.parseToken(tokenResponse.body);
    });

    const invalidPostData = [
        {
            title: '',
            body: 'Body',
            expectedError: '["You must provide a title."]',
            expectedStatus: 400,
            includeToken: true,
            description: 'empty title',
        },
        {
            title: 'Valid title',
            body: '',
            expectedError: '["You must provide a content."]',
            expectedStatus: 400,
            includeToken: true,
            description: 'empty body',
        },
        {
            title: 'Valid Title',
            body: 'Body',
            expectedError: '"Sorry, you must provide a valid token."',
            expectedStatus: 403,
            includeToken: false,
            description: 'no token',
        },
        {
            title: '',
            body: '',
            expectedError: '"Sorry, you must provide a valid token."',
            expectedStatus: 403,
            includeToken: false,
            description: 'all empty without token',
        },
    ];

    for (const data of invalidPostData) {
        test(`should reject post with ${data.description}`, async ({ postsApi }) => {
            const postData: CreatePostDto = {
                title: data.title,
                body: data.body,
                select1: 'One Person',
                uniquePost: 'yes',
                token: data.includeToken ? token : '',
            };

            const response = await postsApi.create(postData);
            expect(response.status).toBe(data.expectedStatus);
            expect(response.body).toBe(data.expectedError);
        });
    }
});
