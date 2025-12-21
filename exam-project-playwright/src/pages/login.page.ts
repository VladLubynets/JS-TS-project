import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { HomePage } from './home.page';
import { Color } from '../test-data/color-palette';
import { VALID_LOGIN, VALID_PASSWORD } from '../test-data/test-data';

export class LoginPage extends BasePage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signInButton: Locator;
    private readonly regUsernameInput: Locator;
    private readonly regEmailInput: Locator;
    private readonly regPasswordInput: Locator;
    private readonly regButton: Locator;
    private readonly alertMessage: Locator;
    private readonly errorMessages: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator("input[placeholder='Username']");
        this.passwordInput = page.locator("input[type='password'].form-control.form-control-sm.input-dark");
        this.signInButton = page.locator('button.btn.btn-primary.btn-sm');
        this.regUsernameInput = page.locator('#username-register');
        this.regEmailInput = page.locator('#email-register');
        this.regPasswordInput = page.locator('#password-register');
        this.regButton = page.locator("button.btn-success:has-text('Sign up for OurApp')");
        this.alertMessage = page.locator('div.alert.alert-danger.text-center');
        this.errorMessages = page.locator('.alert.alert-danger.small.liveValidateMessage.liveValidateMessage--visible');
    }

    async open() {
        await this.page.goto(this.baseUrl);
    }

    async fillUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async verifySignInNotVisible() {
        await expect(this.signInButton).not.toBeVisible();
    }

    async verifyAlertVisible() {
        await expect(this.alertMessage).toBeVisible();
    }

    async verifyAlertNotVisible() {
        await expect(this.alertMessage).not.toBeVisible();
    }

    async fillUsernameAndPress(username: string, key: string) {
        await this.usernameInput.fill(username);
        await this.usernameInput.press(key);
    }

    async fillPasswordAndPress(password: string, key: string) {
        await this.passwordInput.fill(password);
        await this.passwordInput.press(key);
    }

    async verifyAlertText(text: string) {
        await expect(this.alertMessage).toHaveText(text);
    }

    async verifyAlertBackgroundColor(color: Color) {
        await this.verifyBackgroundColor(this.alertMessage, color);
    }

    async verifyUsernameEmpty() {
        await expect(this.usernameInput).toHaveValue('');
    }

    async verifyUsernameValue(text: string) {
        await expect(this.usernameInput).toHaveValue(text);
    }

    async verifyPasswordEmpty() {
        await expect(this.passwordInput).toHaveValue('');
    }

    async loginWithDefaults() {
        await this.open();
        await this.usernameInput.fill(VALID_LOGIN);
        await this.passwordInput.fill(VALID_PASSWORD);
        await this.signInButton.click();
        await expect(this.signInButton).not.toBeVisible();
    }

    async login(username: string, password: string) {
        await this.open();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await expect(this.signInButton).not.toBeVisible();
    }

    async pressEnterOnSignIn() {
        await this.signInButton.press('Enter');
    }

    async verifyPasswordPlaceholder(expectedText: string) {
        await expect(this.passwordInput).toHaveAttribute('placeholder', expectedText);
    }

    async fillValidCredentials() {
        await this.open();
        await this.usernameInput.fill(VALID_LOGIN);
        await this.passwordInput.fill(VALID_PASSWORD);
    }

    async verifySignInButtonText() {
        await expect(this.signInButton).toHaveText('Sign In');
    }

    async verifySignInButtonColor(color: Color) {
        await this.verifyBackgroundColor(this.signInButton, color);
    }

    async verifySignInButtonTextColor(color: Color) {
        await this.verifyTextColor(this.signInButton, color);
    }

    async verifyPasswordInputVisible() {
        await expect(this.passwordInput).toBeVisible();
    }

    async fillPasswordAndVerifyCsrfHidden(password: string) {
        await this.passwordInput.fill(password);
        const csrfField = this.page.locator("input[type='hidden'][name='_csrf']").first();
        await expect(csrfField).toBeHidden();
    }

    async copyFromPassword() {
        await this.passwordInput.focus();
        await this.page.keyboard.press('Control+a');
        await this.page.keyboard.press('Control+c');
    }

    async pasteToUsername() {
        await this.usernameInput.focus();
        await this.page.keyboard.press('Control+v');
    }

    async register(userName: string, password: string, email: string) {
        await this.open();
        await this.regUsernameInput.fill(userName);
        await this.regEmailInput.fill(email);
        await this.regPasswordInput.fill(password);
        await this.page.waitForTimeout(3000);
        await expect(this.errorMessages).toHaveCount(0);
        await this.regButton.click();
        await this.page.waitForTimeout(2000);
        await expect(this.signInButton).not.toBeVisible();

        const homePage = new HomePage(this.page);
        await homePage.header.clickSignOut();
    }
}
