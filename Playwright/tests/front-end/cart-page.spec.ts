import { expect, test } from "@playwright/test";
// import { ProductsPage } from "../../pages/products-page";
import { CartPage } from '../../pages/cart-page';
import { products } from '../../data/product-data';
import { LoginPage } from "../../pages/login-page";
import { testUsers } from "../../data/test-users";


test.beforeEach(async ({ page }) => {

    //Full chain: login() returns ProductsPage, add a product, then goToCart() returns CartPage.
    const loginPage = new LoginPage(page);
    // const productsPage = new ProductsPage(page);
    // const cartPage = new CartPage(page);

    await loginPage.goto();
    // await loginPage.fillUsername(testUsers.standard.username);
    // await loginPage.fillPassword(testUsers.standard.password);
    // await loginPage.clickLoginButton();
    const productsPage = await loginPage.login(testUsers.standard.username, testUsers.standard.password);
    await productsPage.clickProductButtonAddOrRemove(products.jacket, 'add');

    const cartPage = await productsPage.goToCart();

    // await productsPage.clickShoppingCart();
    await expect(cartPage.cartPageTitle, 'Cart page should be loaded before each test starts').toBeVisible();
});

test('Clicking "Remove" button in the cart removes the item from it', async ({page}) => {
    const cartPage = new CartPage(page);
    
    await cartPage.clickRemoveProductButton(products.jacket);

    await expect(cartPage.cartItem,'Clicking the remove ite').not.toBeVisible();
});

test('Clicking "Continue Shopping" button got back to the Products page', async ({page}) => {
    const cartPage = new CartPage(page);
 // continue shopping is now a factory method too - it hands back a ProductsPage directly.
    const productsPage = await cartPage.clickContinueShoppingButton();
    // await cartPage.clickContinueShoppingButton();

    await expect(productsPage.productsLogo,'Page should go to the products page').toBeVisible();
});

//this test will fail just to show the trace on fail and screenshots
test('Clicking "Checkout" button goes to the checkout page', async ({page}) => {
    const cartPage = new CartPage(page);

    await cartPage.clickCheckoutButton();

    await expect(page, 'Page should go to the step one checkout process').toHaveURL(/checkout-step-ones/);
});