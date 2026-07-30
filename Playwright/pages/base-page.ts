import type { Page } from '@playwright/test';

//this page will hold the behavior every page needs so indiviual pages don't redifen navigation, waiting or debugging helpers

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    //navigates directly into an url
    protected async navigate(url: string) {
        await this.page.goto(url);
    }

    //wait for an url patter, userful for redirects
    async waitForURL(pattenr: RegExp) {
        await this.page.waitForURL(pattenr);
    }

    //takes a full page screenshot
    async screenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }

    //exposes the underlying page for page objects
    getPage(): Page {
        return this.page;
    }

}

