import { remote } from 'webdriverio';

/**
 * Shared connection setup - all three tests use the exact same capabilities,
 * so this avoids repeating them (and re-fixing typos) in three separate files.
 */
export async function connectToApiDemos(): Promise<WebdriverIO.Browser> {
    return remote({
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
}