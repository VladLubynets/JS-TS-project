import { Locator, Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { ProductCardComponent } from '../components/product-card.component';

export class InventoryPage {
    public readonly header: HeaderComponent;

    private get pageTitle(): Locator {
        return this.page.locator('.title');
    }

    private get productItems(): Locator {
        return this.page.locator('.inventory_item');
    }

    public constructor(private readonly page: Page) {
        this.header = new HeaderComponent(page);
    }

    public async waitForPageLoad(): Promise<void> {
        await this.pageTitle.waitFor({ state: 'visible' });
    }

    public async getProductsCount(): Promise<number> {
        return await this.productItems.count();
    }

    public getProductCard(index: number): ProductCardComponent {
        const productLocator = this.productItems.nth(index);
        return new ProductCardComponent(productLocator);
    }
}
