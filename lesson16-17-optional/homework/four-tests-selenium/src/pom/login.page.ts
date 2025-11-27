import { By, WebDriver, until } from 'selenium-webdriver';

export class LoginPage {
    private readonly url = 'https://www.saucedemo.com/';

    constructor(private driver: WebDriver) {}

    async goto(): Promise<void> {
        await this.driver.get(this.url);
    }

    async typeUsername(username: string): Promise<void> {
        const input = await this.driver.findElement(By.css('[data-test="username"]'));
        await input.sendKeys(username);
    }

    async typePassword(password: string): Promise<void> {
        const input = await this.driver.findElement(By.css('[data-test="password"]'));
        await input.sendKeys(password);
    }

    async clickLogin(): Promise<void> {
        const btn = await this.driver.findElement(By.css('[data-test="login-button"]'));
        await btn.click();
    }

    async getTitle(): Promise<string> {
        const el = await this.driver.findElement(By.css('.login_logo'));
        return el.getText();
    }

    async getErrorText(): Promise<string> {
        await this.driver.wait(until.elementLocated(By.css('[data-test="error"]')), 5000);
        const el = await this.driver.findElement(By.css('[data-test="error"]'));
        return el.getText();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        const elements = await this.driver.findElements(By.css('[data-test="login-button"]'));
        return elements.length > 0;
    }

    async getUsernameValue(): Promise<string> {
        const input = await this.driver.findElement(By.css('[data-test="username"]'));
        return input.getAttribute('value');
    }

    async getPasswordValue(): Promise<string> {
        const input = await this.driver.findElement(By.css('[data-test="password"]'));
        return input.getAttribute('value');
    }
}


