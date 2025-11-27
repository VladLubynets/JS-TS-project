import { ChainablePromiseElement } from 'webdriverio';
import { $, browser } from '@wdio/globals';

export class JiraPage {
    public get userLogo(): ChainablePromiseElement {
        return $('nav button img');
    }

    public goTo(): void {
        browser.url('https://levkoniuk.atlassian.net/');
    }
}
