import { Page, Locator, expect } from '@playwright/test';

export class HeaderComponent {
    private readonly signOutButton: Locator;
    private readonly avatar: Locator;

    constructor(private readonly page: Page) {
        this.signOutButton = page.locator("button.btn-secondary:has-text('Sign Out')");
        this.avatar = page.locator('span.text-white.mr-2').last();
    }

    async verifySignOutButtonVisible() {
        await expect(this.signOutButton).toBeVisible();
    }

    async clickSignOut() {
        await this.signOutButton.click();
    }

    async verifyAvatarUsername(expectedUsername: string) {
        await expect(this.avatar).toBeVisible();
        const actualUsername = await this.avatar.textContent();
        expect(actualUsername?.trim().toLowerCase()).toBe(expectedUsername.toLowerCase());
    }
}
