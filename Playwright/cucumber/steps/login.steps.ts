import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { CustomWorld } from '../support/world';
import { ProductsPage } from '../../pages/products-page';

let loginPage: LoginPage;
let productsPage: ProductsPage;

Given('Marisa is on the login page', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.goto();
});

When('she logs in with username {string} and password {string}', async function (
    this: CustomWorld,
    username: string,
    password: string) {
    //cucumber just calls here the method instead of playwright test
    productsPage = await loginPage.login(username, password);
});

Then('she should see the products page', async function (this: CustomWorld) {
    await expect(productsPage.productsLogo, 'Products page should be visible after login').toBeVisible();
});