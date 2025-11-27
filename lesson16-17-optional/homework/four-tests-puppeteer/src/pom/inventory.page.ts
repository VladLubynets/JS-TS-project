import { Page } from 'puppeteer';

export class InventoryPage {
    constructor(private page: Page) {}

    async waitForPage(): Promise<void> {
        await this.page.waitForSelector('.title');
    }

    async getTitle(): Promise<string | null> {
        return this.page.$eval('.title', el => el.textContent);
    }

    async getProductsCount(): Promise<number> {
        const items = await this.page.$$('.inventory_item');
        return items.length;
    }

    async getFirstProductName(): Promise<string | null> {
        return this.page.$eval('.inventory_item_name', el => el.textContent);
    }
}


