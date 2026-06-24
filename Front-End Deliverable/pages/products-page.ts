import type { Page, Locator } from "@playwright/test";

export class ProductsPage {
    private readonly page: Page;
    readonly productsLogo: Locator;

    constructor (page: Page) {
        this.page = page;
        this.productsLogo = page.locator('.app_logo');
    }
}