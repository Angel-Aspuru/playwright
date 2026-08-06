import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../../pages/login-page';
import { CartPage } from '../../pages/cart-page';
import { products } from '../../data/product-data';
import { testUsers } from '../../data/test-users';
import { getProductId } from '../support/product-lookup';

let cartPage: CartPage;

Given('Maria has added the {string} to her cart', async function (this: CustomWorld, productKey: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    const productsPage = await loginPage.login(testUsers.standard.username, testUsers.standard.password);

    const productId = getProductId(productKey);
    await productsPage.clickProductButtonAddOrRemove(productId, 'add');

    // Same goToCart() factory method from the POM refactor.
    cartPage = await productsPage.goToCart();
});

When('she removes the {string} from her cart', async function (this: CustomWorld, productKey: string) {
    const productId = getProductId(productKey);
    await cartPage.clickRemoveProductButton(productId);
});

Then('her cart should be empty', async function (this: CustomWorld) {
    await expect(cartPage.cartItem).not.toBeVisible();
});