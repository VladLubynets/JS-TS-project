import { Locator } from '@playwright/test';

export interface ProductInfo {
    name: string;
    description: string;
    price: string;
}

export class ProductCardComponent {
    private get productName(): Locator {
        return this.baseLocator.locator('.inventory_item_name');
    }

    private get productDescription(): Locator {
        return this.baseLocator.locator('.inventory_item_desc');
    }

    private get productPrice(): Locator {
        return this.baseLocator.locator('.inventory_item_price');
    }

    private get addToCartButton(): Locator {
        return this.baseLocator.locator('button[id^="add-to-cart"]');
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getName(): Promise<string> {
        return (await this.productName.textContent()) ?? '';
    }

    public async getDescription(): Promise<string> {
        return (await this.productDescription.textContent()) ?? '';
    }

    public async getPrice(): Promise<string> {
        return (await this.productPrice.textContent()) ?? '';
    }

    public async getProductInfo(): Promise<ProductInfo> {
        return {
            name: await this.getName(),
            description: await this.getDescription(),
            price: await this.getPrice()
        };
    }

    public async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }
}
