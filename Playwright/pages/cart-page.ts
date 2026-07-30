import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from './header-component';
import { ProductsPage } from "./products-page";

export class CartPage extends BasePage {
    readonly header: Header;
    // private readonly page: Page; refactores in base page
    readonly cartItem: Locator;
    readonly cartPageTitle: Locator;
    private readonly removeFromCartButton: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly checkoutButton: Locator;

    constructor (page: Page) {
        super(page);
        // this.page = page;
        this.header = new Header(page);
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

    //goes back to the products page and returns it, so test keep chaining instead of re-navigating manually
    async clickContinueShoppingButton(): Promise<ProductsPage>{
        await this.continueShoppingButton.click();
        return new ProductsPage(this.page);
    }


    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }
    
}