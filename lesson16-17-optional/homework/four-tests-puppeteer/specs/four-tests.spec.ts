import { expect } from 'chai';
import { describe, it, before, after, beforeEach, afterEach } from 'mocha';
import puppeteer, { Browser, Page } from 'puppeteer';
import { LoginPage } from '../src/pom/login.page';
import { InventoryPage } from '../src/pom/inventory.page';

let browser: Browser;

before(async () => {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: { width: 1280, height: 720 }
    });
});

after(async () => {
    await browser.close();
});

describe('Test 1: Login page display', () => {
    let page: Page;
    let loginPage: LoginPage;

    beforeEach(async () => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
    });

    afterEach(async () => {
        await page.close();
    });

    it('should display login page correctly', async () => {
        await loginPage.goto();
        
        const title = await loginPage.getTitle();
        const isButtonVisible = await loginPage.isLoginButtonVisible();
        
        expect(title).to.equal('Swag Labs');
        expect(isButtonVisible).to.be.true;
    });
});

describe('Test 2: Input fields', () => {
    let page: Page;
    let loginPage: LoginPage;

    beforeEach(async () => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
    });

    afterEach(async () => {
        await page.close();
    });

    it('should type credentials into input fields', async () => {
        await loginPage.goto();
        await loginPage.typeUsername('standard_user');
        await loginPage.typePassword('secret_sauce');
        
        const usernameValue = await loginPage.getUsernameValue();
        const passwordValue = await loginPage.getPasswordValue();
        
        expect(usernameValue).to.equal('standard_user');
        expect(passwordValue).to.equal('secret_sauce');
    });
});

describe('Test 3: Empty fields error', () => {
    let page: Page;
    let loginPage: LoginPage;

    beforeEach(async () => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
    });

    afterEach(async () => {
        await page.close();
    });

    it('should show error when fields are empty', async () => {
        await loginPage.goto();
        await loginPage.clickLogin();
        
        const errorText = await loginPage.getErrorText();
        expect(errorText).to.include('Username is required');
    });
});

describe('Test 4: Products display', () => {
    let page: Page;
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    beforeEach(async () => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
    });

    afterEach(async () => {
        await page.close();
    });

    it('should display products after login', async () => {
        await loginPage.goto();
        await loginPage.typeUsername('standard_user');
        await loginPage.typePassword('secret_sauce');
        await loginPage.clickLogin();
        
        await inventoryPage.waitForPage();
        
        const title = await inventoryPage.getTitle();
        const productsCount = await inventoryPage.getProductsCount();
        
        expect(title).to.equal('Products');
        expect(productsCount).to.equal(6);
    });
});
