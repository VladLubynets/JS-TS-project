import { By, WebDriver, until } from 'selenium-webdriver';

export class InventoryPage {
    constructor(private driver: WebDriver) {}

    async waitForPage(): Promise<void> {
        await this.driver.wait(until.elementLocated(By.css('.title')), 10000);
    }

    async getTitle(): Promise<string> {
        const el = await this.driver.findElement(By.css('.title'));
        return el.getText();
    }

    async getProductsCount(): Promise<number> {
        const items = await this.driver.findElements(By.css('.inventory_item'));
        return items.length;
    }

    async getFirstProductName(): Promise<string> {
        const el = await this.driver.findElement(By.css('.inventory_item_name'));
        return el.getText();
    }
}


