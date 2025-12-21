import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { HomePage } from '../../pages/home.page';
import { ApiHelperService } from '../../api/api-helper.service';

type MixedFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    apiHelper: ApiHelperService;
};

export const test = base.extend<MixedFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    apiHelper: async ({ request }, use) => {
        await use(new ApiHelperService(request));
    },
});

export { expect } from '@playwright/test';
