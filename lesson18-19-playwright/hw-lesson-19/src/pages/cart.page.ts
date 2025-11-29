import { Locator, Page } from '@playwright/test';
import { CartItemComponent } from '../components/cart-item.component';

export class CartPage {
    private get pageTitle(): Locator {
        return this.page.locator('.title');
    }

    private get cartItems(): Locator {
        return this.page.locator('.cart_item');
    }

    public constructor(private readonly page: Page) {}

    public async waitForPageLoad(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    public async getCartItemsCount(): Promise<number> {
        return await this.cartItems.count();
    }

    public getCartItemByName(name: string): CartItemComponent {
        const itemLocator = this.cartItems.filter({
            has: this.page.locator('.inventory_item_name', { hasText: name })
        });
        return new CartItemComponent(itemLocator);
    }

    public async removeItem(itemName: string): Promise<void> {
        const item = this.getCartItemByName(itemName);
        await item.remove();
    }

    public async isCartEmpty(): Promise<boolean> {
        return (await this.getCartItemsCount()) === 0;
    }
}
