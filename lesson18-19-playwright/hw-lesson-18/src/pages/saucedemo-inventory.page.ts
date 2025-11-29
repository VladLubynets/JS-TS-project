import { Locator, Page, expect } from '@playwright/test';

export class SauceDemoInventoryPage {
    private get pageTitle(): Locator {
        return this.page.locator('.title');
    }

    private get productItems(): Locator {
        return this.page.locator('.inventory_item');
    }

    private get productNames(): Locator {
        return this.page.locator('.inventory_item_name');
    }

    private get productPrices(): Locator {
        return this.page.locator('.inventory_item_price');
    }

    private get sortDropdown(): Locator {
        return this.page.locator('.product_sort_container');
    }

    private get cartBadge(): Locator {
        return this.page.locator('.shopping_cart_badge');
    }

    public constructor(private readonly page: Page) {}

    public async waitForPageLoad(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    public async getProductsCount(): Promise<number> {
        return await this.productItems.count();
    }

    public async getAllProductNames(): Promise<string[]> {
        const names: string[] = [];
        const count = await this.productNames.count();
        for (let i = 0; i < count; i++) {
            const text = await this.productNames.nth(i).textContent();
            if (text) {
                names.push(text);
            }
        }
        return names;
    }

    public async getAllProductPrices(): Promise<number[]> {
        const prices: number[] = [];
        const count = await this.productPrices.count();
        for (let i = 0; i < count; i++) {
            const text = await this.productPrices.nth(i).textContent();
            if (text) {
                prices.push(parseFloat(text.replace('$', '')));
            }
        }
        return prices;
    }

    public async addProductToCartByName(productName: string): Promise<void> {
        const product = this.productItems.filter({
            has: this.page.locator('.inventory_item_name', { hasText: productName })
        });
        await product.locator('button[id^="add-to-cart"]').click();
    }

    public async removeProductFromCartByName(productName: string): Promise<void> {
        const product = this.productItems.filter({
            has: this.page.locator('.inventory_item_name', { hasText: productName })
        });
        await product.locator('button[id^="remove"]').click();
    }

    public async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
        await this.sortDropdown.selectOption(option);
    }

    public async getCartItemCount(): Promise<number> {
        const isVisible = await this.cartBadge.isVisible();
        if (!isVisible) {
            return 0;
        }
        const text = await this.cartBadge.textContent();
        return text ? parseInt(text, 10) : 0;
    }

    public async verifyPageTitle(expectedTitle: string): Promise<void> {
        await expect(this.pageTitle).toHaveText(expectedTitle);
    }

    public async verifyProductsCount(expectedCount: number): Promise<void> {
        const count = await this.getProductsCount();
        expect(count).toBe(expectedCount);
    }

    public async verifyCartBadgeCount(expectedCount: number): Promise<void> {
        const count = await this.getCartItemCount();
        expect(count).toBe(expectedCount);
    }
}
