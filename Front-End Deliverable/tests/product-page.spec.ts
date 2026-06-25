import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { testUsers } from '../data/test-users';
import { ProductsPage } from '../pages/products-page';
import { products } from '../data/product-data';

test.beforeEach(async ({page}) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standar.username);
    await loginPage.fillPassword(testUsers.standar.password);
    await loginPage.clickLoginButton();

    await expect(productsPage.productsLogo,'Login before each products page test should be succesfull').toBeVisible();
});

test('Add product to cart button should update number badge in cart icon', async ({page}) => {
    const productsPage = new ProductsPage(page);

    await productsPage.clickProductButtonAddOrRemove(products.backpack, 'add');
    await productsPage.clickProductButtonAddOrRemove(products.bike, 'add');

    await expect(productsPage.cartItemsNumber,'there should be two products in the cart').toHaveText('2');
})

test('Validate all product cards are visible', async ({page}) => {
    const productsPage = new ProductsPage(page);

    await expect(productsPage.productCard,'There should be 6 producst listed').toHaveCount(6);
    await expect(productsPage.productCard,'Products should be visible').toBeVisible();
})