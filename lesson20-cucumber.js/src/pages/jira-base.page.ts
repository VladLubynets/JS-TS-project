import { Locator, Page } from 'playwright';
import { SideMenuComponent } from '../components/side-menu.component.ts';
import { CustomizeSidebarModal } from '../components/modal.component.ts';
import { expect } from 'chai';

export class JiraBasePage {
    public get userLogo(): Locator {
        return this.page.locator('nav button img');
    }

    public get title(): Locator {
        return this.page.locator('//title');
    }

    public get pageInstance(): Page {
        return this.page;
    }

    public readonly sideMenuComponent: SideMenuComponent;
    public readonly customizeSidebarModalComponent: CustomizeSidebarModal;

    public constructor(
        protected readonly page: Page,
        protected readonly _url = 'https://levkoniuk.atlassian.net/'
    ) {
        this.sideMenuComponent = new SideMenuComponent(this.page.locator('//*[@aria-label="Sidebar"]/div/div/div/*[@role="list"]'));
        this.customizeSidebarModalComponent = new CustomizeSidebarModal(this.page, 'Customize your sidebar');
    }

    public async goTo(): Promise<void> {
        await this.page.goto(this._url);
        await this.userLogo.waitFor();
    }

    public async verifyTitle(expectedTitle: string): Promise<void> {
        const text = await this.title.textContent();
        console.log(text);

        const title = await this.page.title();

        await expect(title).to.equal(expectedTitle);
    }
}
