import { $, browser } from '@wdio/globals';
import { ChainablePromiseElement } from 'webdriverio';
import * as fs from 'node:fs';

export class AtlassianLoginPage {
    private signInSelector = 'sign-in';

    private get loginState(): ChainablePromiseElement {
        return $('//button[@name="sign-in"] | //div[@data-testid="main-container"]');
    }

    private get signInButton(): ChainablePromiseElement {
        return $('[name="sign-in"]');
    }

    private get emailInput(): ChainablePromiseElement {
        return $('[data-testid="username"]');
    }

    private get continueButton(): ChainablePromiseElement {
        return $('#login-submit');
    }

    private get passwordInput(): ChainablePromiseElement {
        return $('[data-testid="password"]');
    }

    private get loginButton(): ChainablePromiseElement {
        return $('#login-submit');
    }

    public get userLogo(): ChainablePromiseElement {
        return $('[data-testid="main-container"]');
    }

    public get successLoginImg(): ChainablePromiseElement {
        return $('[data-testid="nav-profile-button--trigger"]');
    }


    public async goto(): Promise<void> {
        await browser.url('https://atlassian.com/');
        await this.loginState.waitForStable();
    }

    public async login(username: string, password: string): Promise<void> {
        if (fs.existsSync('cookies.json')) {
            const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf-8'));
            for (const cookie of cookies) {
                if (cookie.expiry) {
                    cookie.expiry = Math.floor(cookie.expiry); // Convert to integer
                }
            }
            await browser.setCookies(cookies);
            return;
        }

        await this.goto();

        await this.signInButton.click();
        await this.emailInput.setValue(username);
        await this.continueButton.click();
        await this.passwordInput.setValue(password);
        await this.loginButton.click();

        await (await this.successLoginImg).waitForExist();

        const cookies = await browser.getCookies();
        fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));
    }
}
