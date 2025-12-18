import { expect } from 'expect-webdriverio';
import { remote } from 'webdriverio';

describe('example w/o wdio.conf.js', async () => {
    let browser: WebdriverIO.Browser;

    before(async () => {
        browser = await remote({
            capabilities: {
                'browserName': 'chrome',
                'goog:chromeOptions': {
                    args: process.env.CI ? ['headless', 'disable-gpu'] : []
                }
            },
            logLevel: 'silent'
        });
    });

    after(async () => {
        await browser.deleteSession();
    });

    it('simple test', async () => {
        await browser.url('https://webdriver.io');

        const apiLink = await browser.$('=Get Started');
        expect(apiLink).toBeDisplayed();

        await apiLink.click();
    });
});
