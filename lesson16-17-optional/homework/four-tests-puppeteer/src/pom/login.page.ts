import { Page } from 'puppeteer';

export class LoginPage {
    private readonly url = 'https://www.saucedemo.com/';

    constructor(private page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async typeUsername(username: string): Promise<void> {
        await this.page.type('[data-test="username"]', username);
    }

    async typePassword(password: string): Promise<void> {
        await this.page.type('[data-test="password"]', password);
    }

    async clickLogin(): Promise<void> {
        await this.page.click('[data-test="login-button"]');
    }

    async getTitle(): Promise<string | null> {
        return this.page.$eval('.login_logo', el => el.textContent);
    }

    async getErrorText(): Promise<string | null> {
        await this.page.waitForSelector('[data-test="error"]');
        return this.page.$eval('[data-test="error"]', el => el.textContent);
    }

    async isLoginButtonVisible(): Promise<boolean> {
        const btn = await this.page.$('[data-test="login-button"]');
        return btn !== null;
    }

    async getUsernameValue(): Promise<string> {
        return this.page.$eval('[data-test="username"]', (el) => (el as HTMLInputElement).value);
    }

    async getPasswordValue(): Promise<string> {
        return this.page.$eval('[data-test="password"]', (el) => (el as HTMLInputElement).value);
    }
}


