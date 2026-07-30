import type { Page, Locator } from '@playwright/test';

export class Header {
    private readonly page: Page;
    readonly logo: Locator;
    readonly cartItemsNumber: Locator;
    readonly cartIcon: Locator;
    private readonly hambugerMenuButton: Locator;
    readonly sideBarItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('.app_logo');
        this.cartItemsNumber = page.locator('.shopping_cart_badge');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.hambugerMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.sideBarItems = page.locator('.bm-item, .menu-item');
    }

    async openMenu() {
        await this.hambugerMenuButton.click();
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }
}