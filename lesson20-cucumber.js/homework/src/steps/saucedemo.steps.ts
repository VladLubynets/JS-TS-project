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
    expect(await this.sauceDemoPage.isErrorVisible()).to.be.true;
});

Then('the error message should contain {string}', async function (this: SauceDemoWorld, text: string) {
    const message = await this.sauceDemoPage.getErrorText();
    expect(message).to.include(text);
});

Then('the user should be redirected to the inventory page', async function (this: SauceDemoWorld) {
    await this.sauceDemoPage.waitForInventoryPage();
});

Then('the page title should be {string}', async function (this: SauceDemoWorld, title: string) {
    expect(await this.sauceDemoPage.getPageTitle()).to.equal(title);
});

When('the user adds {string} to the cart', async function (this: SauceDemoWorld, itemName: string) {
    await this.sauceDemoPage.addItemToCart(itemName);
});

Then('the cart badge should show {string} item', async function (this: SauceDemoWorld, count: string) {
    expect(await this.sauceDemoPage.getCartBadgeCount()).to.equal(count);
});

When('the user goes to the cart', async function (this: SauceDemoWorld) {
    await this.sauceDemoPage.goToCart();
});

Then('the cart should contain {string}', async function (this: SauceDemoWorld, itemName: string) {
    expect(await this.sauceDemoPage.isItemInCart(itemName)).to.be.true;
});

When('the user removes {string} from the cart', async function (this: SauceDemoWorld, itemName: string) {
    await this.sauceDemoPage.removeItemFromCart(itemName);
});

Then('the cart should be empty', async function (this: SauceDemoWorld) {
    expect(await this.sauceDemoPage.getCartItemsCount()).to.equal(0);
});
