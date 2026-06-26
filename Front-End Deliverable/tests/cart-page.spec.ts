import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import { testUsers } from "../data/test-users";
import { CartPage } from "../pages/cart-page";
import { products } from "../data/product-data";


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

})