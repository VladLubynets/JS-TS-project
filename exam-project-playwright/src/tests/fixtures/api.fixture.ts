import { test as base } from '@playwright/test';
import { ApiHelperService } from '../../api/api-helper.service';

interface ApiFixture {
    apiHelper: ApiHelperService;
}

export const apiTest = base.extend<ApiFixture>({
    apiHelper: async ({ request }, use) => {
        const apiHelper = new ApiHelperService(request);
        await use(apiHelper);
    },
});

export { expect } from '@playwright/test';
