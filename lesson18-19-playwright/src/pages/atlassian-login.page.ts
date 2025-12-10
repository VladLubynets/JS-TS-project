import { Locator, Page } from '@playwright/test';
import { ConfigService } from '../services/config.service';

export class AtlassianLoginPage {
    private readonly _url: string;

    private get signInButton(): Locator {
        return this.page.locator('button[name="sign-in"]').filter({ visible: true });
    }

    private get waitLoadedStateLocator(): Locator {
        return this.loggedInLocator.or(this.signInButton).first();
    }

    private get emailInput(): Locator {
        return this.page.locator('#username-uid1');
    }

    private get continueButton(): Locator {
        return this.page.locator('#login-submit');
    }

    private get passwordInput(): Locator {
        return this.page.locator('#password');
    }

    private get passwordInputInteract(): Locator {
        return this.page.locator('#password');
    }

    private get profileIcon(): Locator {
        return this.page.locator('[data-testid="nav-profile-button--trigger"]');
    }

    private get loggedInLocator(): Locator {
        return this.page.locator('//*[@data-testid="main-container"]//button').filter({ visible: true });
    }

    public constructor(
        private readonly page: Page,
        private readonly configService: ConfigService
    ) {
        this._url = this.configService.config.uiConfig.atlassianBaseUrl;
    }

    public async goto(): Promise<void> {
        await this.page.goto(this._url);
        await this.waitLoadedStateLocator.waitFor();
    }

    public async login(workerId: number): Promise<void> {
        await this.goto();

        if (await this.loggedInLocator.isVisible()) {
            return;
        }

        await this.signInButton.click();
        await this.emailInput.fill(this.configService.config.auth.login);
        await this.continueButton.click();
        await this.passwordInput;
        await this.passwordInputInteract.fill(this.configService.config.auth.password);
        await this.continueButton.click();
        await this.loggedInLocator.waitFor();

        await this.page.context().storageState({ path: `.auth/storage-state-${workerId}.json` });
    }
}
