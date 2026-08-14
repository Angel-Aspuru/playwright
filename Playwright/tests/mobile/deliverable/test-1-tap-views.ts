import assert from 'assert';
import { connectToApiDemos } from './connection-to-app';
import { captureScreenshotAndSource } from './diagnostic-capture-helper';

/**
 * Scenario: tap "Views" on the ApiDemos main list, and confirm the resulting
 * sub-screen actually shows its expected content ("Controls").
 */
async function main() {
    const driver = await connectToApiDemos();

    try {
        console.log('App launched, tapping "Views"...');
        await driver.pause(1000);

        const viewsItem = await driver.$('android=new UiSelector().text("Views")');
        await viewsItem.click();

        await driver.pause(1000);

        const controlsItem = await driver.$('android=new UiSelector().text("Controls")');
        const isDisplayed = await controlsItem.isDisplayed();

        assert.strictEqual(isDisplayed, true, 'Expected "Controls" to be visible after tapping "Views"');
        console.log('✅ "Views" screen loaded correctly - "Controls" is visible');

    } catch (err) {
        console.error('❌ Test failed:', (err as Error).message);
        const dir = await captureScreenshotAndSource(driver, 'views-navigation-test');
        console.log(`Diagnostics saved to: ${dir}`);
        throw err;

    } finally {
        await driver.deleteSession();
    }
}

main().catch((err) => {
    console.error('Fatal error running test:', err);
    process.exit(1);
});