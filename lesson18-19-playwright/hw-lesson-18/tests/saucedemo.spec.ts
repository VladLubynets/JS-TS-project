import { test, expect } from '@playwright/test';
import { SauceDemoLoginPage } from '../src/pages/saucedemo-login.page';
import { SauceDemoInventoryPage } from '../src/pages/saucedemo-inventory.page';

test.describe('SauceDemo Tests - Page Object Model', { tag: ['@saucedemo'] }, () => {
    let loginPage: SauceDemoLoginPage;
    let inventoryPage: SauceDemoInventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SauceDemoLoginPage(page);
        inventoryPage = new SauceDemoInventoryPage(page);
        await loginPage.navigate();
    });

    test('Test 1: Login and verify products page', async () => {
        await loginPage.loginAsStandardUser();

        await inventoryPage.waitForPageLoad();
        await inventoryPage.verifyPageTitle('Products');
        await inventoryPage.verifyProductsCount(6);

        const productNames = await inventoryPage.getAllProductNames();
        expect(productNames).toContain('Sauce Labs Backpack');
        expect(productNames).toContain('Sauce Labs Bike Light');
    });

    test('Test 2: Add products to cart and verify cart badge', async () => {
        await loginPage.loginAsStandardUser();
        await inventoryPage.waitForPageLoad();

        await inventoryPage.addProductToCartByName('Sauce Labs Backpack');
        await inventoryPage.verifyCartBadgeCount(1);

        await inventoryPage.addProductToCartByName('Sauce Labs Onesie');
        await inventoryPage.verifyCartBadgeCount(2);

        await inventoryPage.removeProductFromCartByName('Sauce Labs Backpack');
        await inventoryPage.verifyCartBadgeCount(1);
    });

    test('Test 3: Sort products by price and verify order', async () => {
        await loginPage.loginAsStandardUser();
        await inventoryPage.waitForPageLoad();

        await inventoryPage.sortBy('lohi');
        const pricesLowToHigh = await inventoryPage.getAllProductPrices();
        expect(pricesLowToHigh[0]).toBe(7.99);
        expect(pricesLowToHigh[5]).toBe(49.99);

        await inventoryPage.sortBy('hilo');
        const pricesHighToLow = await inventoryPage.getAllProductPrices();
        expect(pricesHighToLow[0]).toBe(49.99);
        expect(pricesHighToLow[5]).toBe(7.99);
    });
});

