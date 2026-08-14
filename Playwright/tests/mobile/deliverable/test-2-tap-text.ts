import assert from 'assert';
import { connectToApiDemos } from './connection-to-app';
import { captureScreenshotAndSource } from './diagnostic-capture-helper';

/**
 * Scenario: tap "Text" on the ApiDemos main list, and confirm the resulting
 * sub-screen actually shows its expected content ("Linkify").
 */
async function main() {
    const driver = await connectToApiDemos();

    try {
        console.log('App launched, tapping "Text"...');
        await driver.pause(1000);

        const textItem = await driver.$('android=new UiSelector().text("Text")');
        await textItem.click();

        await driver.pause(1000);

        const linkifyItem = await driver.$('android=new UiSelector().text("Linkify")');
        const isDisplayed = await linkifyItem.isDisplayed();

        assert.strictEqual(isDisplayed, true, 'Expected "Linkify" to be visible after tapping "Text"');
        console.log('✅ "Text" screen loaded correctly - "Linkify" is visible');

    } catch (err) {
        console.error('❌ Test failed:', (err as Error).message);
        const dir = await captureScreenshotAndSource(driver, 'text-navigation-test');
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