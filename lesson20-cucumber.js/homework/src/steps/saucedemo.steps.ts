import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { SauceDemoWorld } from '../worlds/saucedemo.world.ts';

Given('the user is on the login page', async function (this: SauceDemoWorld) {
    await this.sauceDemoPage.goto();
});

When('the user logs in with username {string} and password {string}', async function (this: SauceDemoWorld, username: string, password: string) {
    await this.sauceDemoPage.login(username, password);
});

Then('an error message should be displayed', async function (this: SauceDemoWorld) {
    expect(await this.sauceDemoPage.errorMessage.isVisible()).to.be.true;
});

Then('the error message should contain {string}', async function (this: SauceDemoWorld, text: string) {
    const message = await this.sauceDemoPage.errorMessage.textContent();
    expect(message).to.include(text);
});

Then('the user should be redirected to the inventory page', async function (this: SauceDemoWorld) {
    await this.sauceDemoPage.pageTitle.waitFor({ state: 'visible' });
});

Then('the page title should be {string}', async function (this: SauceDemoWorld, title: string) {
    expect(await this.sauceDemoPage.pageTitle.textContent()).to.equal(title);
});

When('the user adds {string} to the cart', async function (this: SauceDemoWorld, itemName: string) {
    await this.sauceDemoPage.getInventoryItem(itemName).locator('button[data-test^="add-to-cart"]').click();
});

Then('the cart badge should show {string} item', async function (this: SauceDemoWorld, count: string) {
    expect(await this.sauceDemoPage.cartBadge.textContent()).to.equal(count);
});

When('the user goes to the cart', async function (this: SauceDemoWorld) {
    await this.sauceDemoPage.cartLink.click();
});

Then('the cart should contain {string}', async function (this: SauceDemoWorld, itemName: string) {
    expect(await this.sauceDemoPage.getCartItem(itemName).isVisible()).to.be.true;
});

When('the user removes {string} from the cart', async function (this: SauceDemoWorld, itemName: string) {
    await this.sauceDemoPage.getCartItem(itemName).locator('button[data-test^="remove"]').click();
});

Then('the cart should be empty', async function (this: SauceDemoWorld) {
    expect(await this.sauceDemoPage.cartItems.count()).to.equal(0);
});
