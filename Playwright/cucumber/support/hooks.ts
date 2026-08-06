import {Before, After} from '@cucumber/cucumber';
import {chromium} from '@playwright/test';
import {CustomWorld} from './world';


// Runs before EVERY scenario - equivalent to Playwright's test.beforeEach,
// but here we manage the browser lifecycle ourselves since Cucumber
// doesn't provide Playwright fixtures out of the box.
Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

// Runs after EVERY scenario - always close
After(async function (this: CustomWorld) {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});