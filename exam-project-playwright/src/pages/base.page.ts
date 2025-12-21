import { Page, Locator, expect } from '@playwright/test';
import { Color } from '../test-data/color-palette';
import { BASE_URL } from '../api/endpoints';

export class BasePage {
    readonly baseUrl = BASE_URL;

    constructor(protected readonly page: Page) {}

    async resizeWindow(width: number, height: number) {
        await this.page.setViewportSize({ width, height });
    }

    async minimizeWindow() {
        await this.page.setViewportSize({ width: 100, height: 100 });
    }

    async maximizeWindow() {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
    }

    async refresh() {
        await this.page.reload();
    }

    protected async verifyBackgroundColor(element: Locator, color: Color) {
        await expect(element).toHaveCSS('background-color', color);
    }

    protected async verifyTextColor(element: Locator, color: Color) {
        await expect(element).toHaveCSS('color', color);
    }
}
