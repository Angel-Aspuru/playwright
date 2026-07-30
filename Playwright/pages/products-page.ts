import type { Page, Locator } from "@playwright/test";
import { BasePage } from "./base-page";
import { Header } from "./header-component";
import { CartPage } from "./cart-page";

export class ProductsPage extends BasePage {
    readonly header: Header;
    // private readonly page: Page; refactored to base page
    // readonly productsLogo: Locator; refactored to header component
    readonly productCard: Locator;
    // readonly cartItemsNumber: Locator; refactored to header component
    private readonly addProductToCartButton: Locator;
    private readonly removeProductFromCartButton: Locator;
    // private readonly hamburguerMenu: Locator; refactored to header component
    // private readonly cartItemsButton: Locator; refactored to header component
    // readonly sideBarItem: Locator; refactored to header component
    readonly productImage: Locator;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
        // this.page = page;
        // this.productsLogo = page.locator('.app_logo');
        this.productCard = page.locator('//div[@class="inventory_item"]');
        // this.cartItemsNumber = page.locator('.shopping_cart_badge');
        // this.cartItemsButton = page.locator('.shopping_cart_link');
        this.addProductToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.removeProductFromCartButton = page.getByRole('button', { name: 'Remove' });
        // this.hamburguerMenu = page.getByRole('button', {name: 'Open Menu'});
        this.productImage = page.getByRole('link').filter({has: page.getByRole('img')});
        // this.sideBarItem = page.locator('.bm-item, .menu-item')
    }


    //keepong as getters so exixting tests don't break, but these are now refactored to the header component
    get productsLogo(): Locator {
        return this.header.logo;
    }

    get cartItemsNumber(): Locator {
        return this.header.cartItemsNumber;
    }

    get sideBarItem(): Locator {
        return this.header.sideBarItems;
    }

    get openHamburguerMenuButton() {
        return this.header.openMenu();
    }

//refactored to the header component
    // async openHamburguerMenu() {
    //     await this.hamburguerMenu.click();
    // }
    // async clickShoppingCart() {
    //     await this.cartItemsButton.click();
    // }

    async clickProductButtonAddOrRemove(product: string, action: 'add' | 'remove' = 'add') {
        const button = action === 'add' ? this.addProductToCartButton : this.removeProductFromCartButton;

        await button
            //narrows the locator to elements that match both conditions — so it finds a button named "Add to cart" that also has an id containing  the product
            .and(this.page.locator(`[id*="${product}"]`))
            .click();
    };

    //clicks the cart icon and return the next page object, so tests read as "go to cart" rather than manually building a CartPage.
    async goToCart(): Promise<CartPage>{
        await this.header.clickCartIcon();
        return new CartPage(this.page);
    }
}