import { Locator, Page } from '@playwright/test';

export class BaseModalComponent {
    private get title(): Locator {
        return this.baseLocator.locator('h1');
    }

    private get closeButton(): Locator {
        return this.baseLocator.locator('//*[@aria-label="Cancel changes to your sidebar"]');
    }

    protected readonly baseLocator: Locator;

    public constructor(page: Page, modalName: string) {
        this.baseLocator = page.locator(`//section[@role="dialog"][.//h1[normalize-space()="${modalName}"]]`);
    }

    public async waitFor(): Promise<void> {
        await this.baseLocator.waitFor({ state: 'visible' });
    }

    public async getTitle(): Promise<string> {
        return (await this.title.textContent()) as string;
    }

    public async close(): Promise<void> {
        await this.closeButton.click();
    }
}
