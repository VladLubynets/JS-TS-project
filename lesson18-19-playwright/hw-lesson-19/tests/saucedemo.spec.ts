import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/login.page';
import { InventoryPage } from '../src/pages/inventory.page';
import { CartPage } from '../src/pages/cart.page';

test.describe('SauceDemo Tests with Components', { tag: ['@saucedemo'] }, () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.navigate();
        await loginPage.loginAsStandardUser();
        await inventoryPage.waitForPageLoad();
    });

    test('should display products on inventory page', async () => {
        const productsCount = await inventoryPage.getProductsCount();
        expect(productsCount).toBeGreaterThan(0);
    });

    test('should display product card info using ProductCard component', async () => {
        const product = inventoryPage.getProductCard(0);
        const info = await product.getProductInfo();

        expect(info.name).toBeTruthy();
        expect(info.price).toMatch(/^\$\d+\.\d{2}$/);
    });

    test('should add product to cart using ProductCard component', async () => {
        const product = inventoryPage.getProductCard(0);
        await product.addToCart();

        const cartCount = await inventoryPage.header.getCartItemCount();
        expect(cartCount).toBe(1);
    });

    test('should display cart item using CartItem component', async () => {
        const product = inventoryPage.getProductCard(0);
        const productName = await product.getName();
        await product.addToCart();

        await inventoryPage.header.goToCart();
        await cartPage.waitForPageLoad();

        const cartItem = cartPage.getCartItemByName(productName);
        const itemInfo = await cartItem.getCartItemInfo();

        expect(itemInfo.name).toBe(productName);
        expect(itemInfo.quantity).toBe('1');
    });

    test('should remove item from cart using CartItem component', async () => {
        const product = inventoryPage.getProductCard(0);
        const productName = await product.getName();
        await product.addToCart();

        await inventoryPage.header.goToCart();
        await cartPage.waitForPageLoad();

        await cartPage.removeItem(productName);

        const isEmpty = await cartPage.isCartEmpty();
        expect(isEmpty).toBeTruthy();
    });

    test('should logout using Header component', async () => {
        await inventoryPage.header.logout();
        await loginPage.verifyLoginPageLoaded();
    });
});
