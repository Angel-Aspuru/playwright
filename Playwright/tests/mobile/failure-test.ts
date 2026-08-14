import { remote } from 'webdriverio';
import assert from 'assert';
import { captureFailureDiagnostics } from './failures-diagnostics-test';
async function main() {
    const driver = await remote({
        protocol: 'http',
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: 'Android',
            'appium:deviceName': 'emulator-5554',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'io.appium.android.apis',
            'appium:appActivity': '.ApiDemos',
        }
    });

    try {
        console.log('App launched, running test...');
        await driver.pause(1000);

        // This element does not exist in ApiDemos - written this way on purpose,
        // so the test fails and we can see the diagnostics capture actually work.
        const nonExistentElement = await driver.$('~this-does-not-exist');
        const isDisplayed = await nonExistentElement.isDisplayed();

        assert.strictEqual(isDisplayed, true, 'Expected the "this-does-not-exist" element to be visible');

        console.log('✅ Test passed (should not reach here in this demo)');

    } catch (err) {
        console.error('❌ Test failed:', (err as Error).message);

        // Capture diagnostics BEFORE ending the session - once deleteSession()
        // runs, the device state at the moment of failure is gone.
        const diagnosticsDir = await captureFailureDiagnostics(driver, 'nonexistent-element-test');
        console.log(`Diagnostics saved to: ${diagnosticsDir}`);

        // Re-throw so the process still exits with a failure code -
        // a CI pipeline needs to see this as a real failure, not a silent pass.
        throw err;

    } finally {
        await driver.deleteSession();
    }
}

main().catch(() => process.exit(1));