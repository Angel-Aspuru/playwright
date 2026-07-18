import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login-page';
import { testUsers } from '../../data/test-users';
import { ProductsPage } from '../../pages/products-page';
import { products } from '../../data/product-data';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standard.username);
    await loginPage.fillPassword(testUsers.standard.password);
    await loginPage.clickLoginButton();

    await expect(productsPage.productsLogo, 'Login before each products page test should be succesfull').toBeVisible();
});

test('Add product to cart button should update number badge in cart icon', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.clickProductButtonAddOrRemove(products.backpack, 'add');
    await productsPage.clickProductButtonAddOrRemove(products.bike, 'add');

    await expect(productsPage.cartItemsNumber, 'there should be two products in the cart').toHaveText('2');
})

test('Product can be removed from cart after being added to it', async ({ page }) => {
    const productPage = new ProductsPage(page);

    await productPage.clickProductButtonAddOrRemove(products.onesie, 'add');
    await productPage.clickProductButtonAddOrRemove(products.onesie, 'remove');

    await expect(productPage.cartItemsNumber, 'there should not be any badge number').not.toBeVisible();
})

test('Validate all product cards are visible', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await expect(productsPage.productCard, 'There should be 6 producst listed').toHaveCount(6);

    const cards = await productsPage.productCard.all();
    for (const card of cards) {
        await expect(card, 'Products should be visible').toBeVisible();
    }
})

test('Images of products are visible', async ({ page }) => {
    const productPage = new ProductsPage(page);

    await expect(productPage.productImage, 'there should be 6 images').toHaveCount(6);

    //I can loop after selecting all elements to verify each on of them are visible because tobevisible only works with one element
    const images = await productPage.productImage.all();
    for (const img of images) {
        await expect(img, 'image of each product should be visible').toBeVisible();
    }
})

test('Clicking Harmburguer menu show the four links', async ({ page }) => {
    const productPage = new ProductsPage(page);

    await productPage.openHamburguerMenu();

    await expect(productPage.sideBarItem, 'There should be 4 elements in the side bar menu').toHaveCount(4);
})  