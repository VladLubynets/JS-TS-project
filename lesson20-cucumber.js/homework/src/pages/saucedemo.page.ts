import { Locator, Page } from 'playwright';

export class SauceDemoPage {
    private get usernameInput(): Locator {
        return this.page.locator('[data-test="username"]');
    }

    private get passwordInput(): Locator {
        return this.page.locator('[data-test="password"]');
    }

    private get loginButton(): Locator {
        return this.page.locator('[data-test="login-button"]');
    }

    private get errorMessage(): Locator {
        return this.page.locator('[data-test="error"]');
    }

    private get pageTitle(): Locator {
        return this.page.locator('.title');
    }

    private get cartBadge(): Locator {
        return this.page.locator('.shopping_cart_badge');
    }

    private get cartLink(): Locator {
        return this.page.locator('.shopping_cart_link');
    }

    private get cartItems(): Locator {
        return this.page.locator('.cart_item');
    }

    public constructor(private readonly page: Page) {}

    public async goto(): Promise<void> {
        await this.page.goto('https://www.saucedemo.com');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async isErrorVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    public async getErrorText(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }

    public async waitForInventoryPage(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    public async getPageTitle(): Promise<string> {
        return (await this.pageTitle.textContent()) ?? '';
    }

    public async addItemToCart(itemName: string): Promise<void> {
        const item = this.page.locator('.inventory_item', { hasText: itemName });
        await item.locator('button[data-test^="add-to-cart"]').click();
    }

    public async getCartBadgeCount(): Promise<string> {
        return (await this.cartBadge.textContent()) ?? '0';
    }

    public async goToCart(): Promise<void> {
        await this.cartLink.click();
    }

    public async isItemInCart(itemName: string): Promise<boolean> {
        const item = this.page.locator('.cart_item', { hasText: itemName });
        return await item.isVisible();
    }

    public async removeItemFromCart(itemName: string): Promise<void> {
        const item = this.page.locator('.cart_item', { hasText: itemName });
        await item.locator('button[data-test^="remove"]').click();
    }

    public async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();  
    }
}
