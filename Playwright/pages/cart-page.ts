import type { Page, Locator } from "@playwright/test";

export class CartPage {
    private readonly page: Page;
    readonly cartItem: Locator;
    readonly cartPageTitle: Locator;
    private readonly removeFromCartButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartItem = page.locator('.cart_item');
        this.cartPageTitle = page.locator('.title');
        this.removeFromCartButton = page.getByRole('button', {name: 'Remove'});
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'});
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'});
    }

    async clickRemoveProductButton(product: string) {
        await this.removeFromCartButton
            .and(this.page.locator(`[id*="${product}"]`))
            .click();
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
}