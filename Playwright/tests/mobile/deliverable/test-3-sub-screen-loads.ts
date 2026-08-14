import assert from 'assert';
import { connectToApiDemos } from './connection-to-app';
import { captureScreenshotAndSource } from './diagnostic-capture-helper';

/**
 * Scenario: tap "App" on the ApiDemos main list, and confirm the resulting
 * sub-screen actually shows its expected content ("Activity").
 */
async function main() {
    const driver = await connectToApiDemos();

    try {
        console.log('App launched, tapping "App"...');
        await driver.pause(1000);

        const appItem = await driver.$('android=new UiSelector().text("App")');
        await appItem.click();

        await driver.pause(1000);

        const activityItem = await driver.$('android=new UiSelector().text("Activity")');
        const isDisplayed = await activityItem.isDisplayed();

        assert.strictEqual(isDisplayed, true, 'Expected "Activity" to be visible after tapping "App"');
        console.log('✅ "App" screen loaded correctly - "Activity" is visible');

    } catch (err) {
        console.error('❌ Test failed:', (err as Error).message);
        const dir = await captureScreenshotAndSource(driver, 'app-navigation-test');
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