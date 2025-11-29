import { Locator } from '@playwright/test';

export interface CartItemInfo {
    name: string;
    description: string;
    price: string;
    quantity: string;
}

export class CartItemComponent {
    private get itemName(): Locator {
        return this.baseLocator.locator('.inventory_item_name');
    }

    private get itemDescription(): Locator {
        return this.baseLocator.locator('.inventory_item_desc');
    }

    private get itemPrice(): Locator {
        return this.baseLocator.locator('.inventory_item_price');
    }

    private get itemQuantity(): Locator {
        return this.baseLocator.locator('.cart_quantity');
    }

    private get removeButton(): Locator {
        return this.baseLocator.locator('button[id^="remove"]');
    }

    public constructor(private readonly baseLocator: Locator) {}

    public async getName(): Promise<string> {
        return (await this.itemName.textContent()) ?? '';
    }

    public async getDescription(): Promise<string> {
        return (await this.itemDescription.textContent()) ?? '';
    }

    public async getPrice(): Promise<string> {
        return (await this.itemPrice.textContent()) ?? '';
    }

    public async getQuantity(): Promise<string> {
        return (await this.itemQuantity.textContent()) ?? '';
    }

    public async getCartItemInfo(): Promise<CartItemInfo> {
        return {
            name: await this.getName(),
            description: await this.getDescription(),
            price: await this.getPrice(),
            quantity: await this.getQuantity()
        };
    }

    public async remove(): Promise<void> {
        await this.removeButton.click();
    }
}
