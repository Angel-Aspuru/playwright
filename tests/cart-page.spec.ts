import { expect, test } from "@playwright/test";
import { ProductsPage } from "../Front-End Deliverable/pages/products-page";
import { CartPage } from "../Front-End Deliverable/pages/cart-page";
import { products } from "../Front-End Deliverable/data/product-data";
import { LoginPage } from "../Front-End Deliverable/pages/login-page";
import { testUsers } from "../Front-End Deliverable/data/test-users";


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standard.username);
    await loginPage.fillPassword(testUsers.standard.password);
    await loginPage.clickLoginButton();
    await productsPage.clickProductButtonAddOrRemove(products.jacket, 'add');
    await productsPage.clickShoppingCart();

    await expect(cartPage.cartPageTitle, 'Cart page should be loaded before each test starts').toBeVisible();
});

test('Clicking "Remove" button in the cart removes the item from it', async ({page}) => {
    const cartPage = new CartPage(page);
    
    await cartPage.clickRemoveProductButton(products.jacket);

    await expect(cartPage.cartItem,'Clicking the remove ite').not.toBeVisible();
});

test('Clicking "Continue Shopping" button got back to the Products page', async ({page}) => {
    const cartPage = new CartPage(page);

    await cartPage.clickContinueShoppingButton();

    await expect(page,'Page should go to the products page').toHaveURL(/inventory/);
});

//this test will fail just to show the trace on fail and screenshots
test('Clicking "Checkout" button goes to the checkout page', async ({page}) => {
    const cartPage = new CartPage(page);

    await cartPage.clickCheckoutButton();

    await expect(page, 'Page should go to the step one checkout process').toHaveURL(/checkout-step-ones/);
});