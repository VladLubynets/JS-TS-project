import { Locator, Page } from '@playwright/test';

export class HeaderComponent {
    private get menuButton(): Locator {
        return this.page.locator('#react-burger-menu-btn');
    }

    private get cartButton(): Locator {
        return this.page.locator('.shopping_cart_link');
    }

    private get cartBadge(): Locator {
        return this.page.locator('.shopping_cart_badge');
    }

    private get menuContainer(): Locator {
        return this.page.locator('.bm-menu-wrap');
    }

    private get logoutLink(): Locator {
        return this.page.locator('#logout_sidebar_link');
    }

    public constructor(private readonly page: Page) {}

    public async openMenu(): Promise<void> {
        await this.menuButton.click();
        await this.menuContainer.waitFor({ state: 'visible' });
    }

    public async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    public async getCartItemCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text = await this.cartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
    }

    public async logout(): Promise<void> {
        await this.openMenu();
        await this.logoutLink.click();
    }
}
