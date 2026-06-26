// Run global-setup.ts first → launches 3 browsers, logs in, saves the .json files
// Close those browsers
// Then run your actual tests using the saved state
import { chromium, firefox, webkit } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { testUsers } from "../data/test-users";

const browsers = [
    { browserType: chromium, path: 'playwright/.auth/user-chromium.json' },
    { browserType: firefox, path: 'playwright/.auth/user-firefox.json' },
    { browserType: webkit, path: 'playwright/.auth/user-webkit.json' }
];

async function loginAndSave(browserType: typeof chromium, path: string) {
    const browser = await browserType.launch();
    const page = await browser.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillUsername(testUsers.standard.username);
    await loginPage.fillPassword(testUsers.standard.password);
    await loginPage.clickLoginButton();

    await page.context().storageState({ path });
    await browser.close();
}

async function globalSetup() {
    await Promise.all(browsers.map(({ browserType, path }) => loginAndSave(browserType, path)));
}

export default globalSetup;