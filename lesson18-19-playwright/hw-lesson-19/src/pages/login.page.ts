import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {
    private readonly url = 'https://www.saucedemo.com/';

    private get usernameInput(): Locator {
        return this.page.locator('#user-name');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    private get loginButton(): Locator {
        return this.page.locator('#login-button');
    }

    private get logo(): Locator {
        return this.page.locator('.login_logo');
    }

    public constructor(private readonly page: Page) {}

    public async navigate(): Promise<void> {
        await this.page.goto(this.url);
        await this.loginButton.waitFor({ state: 'visible' });
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async loginAsStandardUser(): Promise<void> {
        await this.login('standard_user', 'secret_sauce');
    }

    public async verifyLoginPageLoaded(): Promise<void> {
        await expect(this.logo).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}
