import { World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from 'playwright';
import { SauceDemoPage } from '../pages/saucedemo.page.ts';

export class SauceDemoWorld extends World {
    public static browser: Browser;
    public context: BrowserContext;
    public page: Page;

    private _sauceDemoPage: SauceDemoPage;

    public get sauceDemoPage(): SauceDemoPage {
        if (!this._sauceDemoPage) {
            this._sauceDemoPage = new SauceDemoPage(this.page);
        }
        return this._sauceDemoPage;
    }
}
