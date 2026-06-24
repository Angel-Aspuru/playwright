import type {Page, Locator} from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly formUsername: Locator;
    private readonly formPassword: Locator;
    private readonly formLoginButton: Locator;
    readonly mainHeader: Locator;
    readonly incorrentUserAlert: Locator;
    readonly lockedOutUserAlert: Locator;
    private readonly closeLoginAlertButton: Locator;

    constructor (page: Page){
        this.page= page;
        this.formUsername = page.getByPlaceholder('Username');
        this.formPassword = page.getByPlaceholder('Password');
        this.formLoginButton = page.locator('#login-button');
        this.mainHeader = page.locator('.login-logo');
        this.incorrentUserAlert = page.getByRole('heading', {level: 3}).filter({hasText: 'Username and password do not match'});
        this.lockedOutUserAlert = page.getByRole('heading', {level: 3}).filter({hasText: 'locked out'});
        this.closeLoginAlertButton = page.getByRole('heading', {level: 3}).getByRole('button');
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
}