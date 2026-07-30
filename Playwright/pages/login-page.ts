import type { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';
import { ProductsPage } from './products-page';

export class LoginPage extends BasePage {
    // private readonly page: Page; refactored to base page
    private readonly formUsername: Locator;
    private readonly formPassword: Locator;
    private readonly formLoginButton: Locator;
    readonly mainHeader: Locator;
    readonly incorrentUserAlert: Locator;
    readonly lockedOutUserAlert: Locator;
    private readonly closeLoginAlertButton: Locator;

    constructor(page: Page) {
        // this.page = page;
        super(page); // refactored to base page calling super constructor 
        this.formUsername = page.getByPlaceholder('Username');
        this.formPassword = page.getByPlaceholder('Password');
        this.formLoginButton = page.locator('#login-button');
        this.mainHeader = page.locator('.login_logo');
        this.incorrentUserAlert = page.getByRole('heading', { level: 3 }).filter({ hasText: 'Username and password do not match' });
        this.lockedOutUserAlert = page.getByRole('heading', { level: 3 }).filter({ hasText: 'locked out' });
        this.closeLoginAlertButton = page.getByRole('heading', { level: 3 }).getByRole('button');
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async fillUsername(usernmae: string) {
        await this.formUsername.fill(usernmae);
    }

    async fillPassword(password: string) {
        await this.formPassword.fill(password);
    }

    async clickLoginButton() {
        await this.formLoginButton.click();
    }

    async closeLoginAlert() {
        await this.closeLoginAlertButton.click();
    }

    //login method that returns the products page object after successful login so tests no longer need to create a new products page object after login, it will be returned by the login method   
    async login(username: string, password: string): Promise<ProductsPage> {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        return new ProductsPage(this.page);
    }
}