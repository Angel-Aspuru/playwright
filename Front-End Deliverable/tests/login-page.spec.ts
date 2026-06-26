import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { ProductsPage } from "../pages/products-page";
import { testUsers } from "../data/test-users";

test('user can login into page and see the content in homepage', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await expect(page, 'login page should have correct URL').toHaveURL(/saucedemo/);
    await expect(loginPage.mainHeader, 'main header should be visible').toBeVisible();

});

test('When user enters correct credential it should login into the intentory page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standard.username);
    await loginPage.fillPassword(testUsers.standard.password);
    await loginPage.clickLoginButton();

    await expect(productsPage.productsLogo, 'Product logo should be visible after loggin in').toBeVisible();
});

test('Incorret password or username should trigger an alert', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standard.username);
    await loginPage.fillPassword('WrongPassword');
    await loginPage.clickLoginButton();

    await expect(loginPage.incorrentUserAlert).toBeVisible();
    await expect(loginPage.incorrentUserAlert).toHaveText('Epic sadface: Username and password do not match any user in this service');

    await loginPage.closeLoginAlert();

});

test('When a locked out user tries to login an alert should display to the user saying the account has been locked out.', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.fillUsername(testUsers.lockout.username);
    await loginPage.fillPassword(testUsers.lockout.password);
    await loginPage.clickLoginButton();

    await expect(loginPage.lockedOutUserAlert).toBeVisible();
    await expect(loginPage.lockedOutUserAlert).toHaveText('Epic sadface: Sorry, this user has been locked out.');

    await loginPage.closeLoginAlert();
})