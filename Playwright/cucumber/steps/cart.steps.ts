import {Given, When, Then} from '@cucumber/cucumber';
import {expect} from '@playwright/test';
import {LoginPage} from '../../pages/login-page';
import {CustomWorld} from '../support/world';
import {ProductsPage} from '../../pages/products-page';
import {products} from '../../data/product-data';
import {testUsers} from '../../data/test-users';
import {getProductId} from '../support/product-lookup';

let productsPage: ProductsPage;

Given('Marisa is logged in', async function (this: CustomWorld) {
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    productsPage = await loginPage.login(testUsers.standard.username, testUsers.standard.password);
});

When('she adds the {string} to her cart', async function (this: CustomWorld, productKey: string) {
    const productId = getProductId(productKey);
    await productsPage.clickProductButtonAddOrRemove(productId, 'add');
});

Then('the cart badge should show {string} item', async function (this: CustomWorld, count: string){
    await expect(productsPage.cartItemsNumber, 'Cart badge should show the correct item count').toHaveText(count);
});