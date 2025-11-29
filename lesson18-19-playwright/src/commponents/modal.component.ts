import { Locator, Page } from '@playwright/test';
import { BaseModalComponent } from './base-modal.component';

export class CustomizeSidebarModal extends BaseModalComponent {
    private get customizeJiraNavigationElements(): Locator {
        return this.baseLocator.locator('//div[@aria-label="Customize Jira navigation"]//*[@role="list"]//*[@role="listitem"]');
    }

    private get appShortcutsElements(): Locator {
        return this.baseLocator.locator('//div[@aria-label="App shortcuts"]//*[@role="list"]//*[@role="listitem"]');
    }

    private readonly itemTextSelector = '//*[@data-testid="checkbox-item-wrapper"]/div';

    public constructor(page: Page, modalName: string) {
        super(page, modalName);
    }

    public async getCustomizeJiraNavigationElements(): Promise<string[]> {
        await this.waitFor();
        const elementsText: string[] = [];
        const elements = await this.customizeJiraNavigationElements.all();
        for (const element of elements) {
            const text = await element.locator(this.itemTextSelector).innerText();
            elementsText.push(text);
        }
        return elementsText;
    }
}
