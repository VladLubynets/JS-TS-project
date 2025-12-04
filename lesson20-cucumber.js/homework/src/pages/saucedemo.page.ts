import { Locator, Page } from 'playwright';

export class SauceDemoPage {
    public get usernameInput(): Locator { return this.page.locator('[data-test="username"]'); }
    public get passwordInput(): Locator { return this.page.locator('[data-test="password"]'); }
    public get loginButton(): Locator { return this.page.locator('[data-test="login-button"]'); }
    public get errorMessage(): Locator { return this.page.locator('[data-test="error"]'); }
    public get pageTitle(): Locator { return this.page.locator('.title'); }
    public get cartBadge(): Locator { return this.page.locator('.shopping_cart_badge'); }
    public get cartLink(): Locator { return this.page.locator('.shopping_cart_link'); }
    public get cartItems(): Locator { return this.page.locator('.cart_item'); }

    public constructor(private readonly page: Page) {}

    public async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public getInventoryItem(name: string): Locator {
        return this.page.locator('.inventory_item', { hasText: name });
    }

    public getCartItem(name: string): Locator {
        return this.page.locator('.cart_item', { hasText: name });
    }
}

