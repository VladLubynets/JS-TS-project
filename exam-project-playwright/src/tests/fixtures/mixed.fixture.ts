import { test as pageTest } from './base.fixture';
import { AuthApi, UsersApi, PostsApi } from '../../api/services';
import { ApiFixtures } from './fixture.types';

export const test = pageTest.extend<ApiFixtures>({
    authApi: async ({ request }, use) => {
        await use(new AuthApi(request));
    },
    usersApi: async ({ request }, use) => {
        await use(new UsersApi(request));
    },
    postsApi: async ({ request }, use) => {
        await use(new PostsApi(request));
    },
});

export { expect } from '@playwright/test';
