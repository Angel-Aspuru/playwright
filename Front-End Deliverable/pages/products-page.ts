import type { Page, Locator } from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    readonly productsLogo: Locator;
    readonly productCard: Locator;
    readonly cartItemsNumber: Locator;
    private readonly addProductToCartButton: Locator;
    private readonly removeProductFromCartButton: Locator;
    private readonly hamburguerMenu: Locator;
    private readonly cartItemsButton: Locator;
    readonly sideBarItem: Locator;
    readonly productImage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsLogo = page.locator('.app_logo');
        this.productCard = page.locator('//div[@class="inventory_item"]');
        this.cartItemsNumber = page.locator('.shopping_cart_badge');
        this.cartItemsButton = page.locator('.shopping_cart_link');
        this.addProductToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeProductFromCartButton = page.getByRole('button', { name: 'Remove' });
        this.hamburguerMenu = page.getByRole('button', {name: 'Open Menu'});
        this.productImage = page.getByRole('img');
        this.sideBarItem = page.locator('.bm-item menu-item')
    }

    async openHamburguerMenu() {
        await this.hamburguerMenu.click();
    }

    async clickProductButtonAddOrRemove(product: string, action: 'add' | 'remove' = 'add') {
        const button = action === 'add' ? this.addProductToCartButton : this.removeProductFromCartButton;

        await button
            //filtering the buttons of all products and then selecting the one that contains the product keyword. "*=" means contain 
            .filter({ has: this.page.locator(`[id*="${product}"]`) })
            .click();
    };

    async clickShoppingCart() {
        await this.cartItemsButton.click();
    }
}