import { remote } from 'webdriverio';

async function main() {
    const driver = await remote({
        protocol: 'http',
        hostname: 'localhost',
        port: 4723,
        path: '/',
        capabilities: {
            platformName: 'Android',
            'appium:deviceName': 'emular-5554',
            'appium:automationName': 'UiAutomator2',
            'appium:appPackage': 'io.appium.android.apis',
            'appium:appActivity': '.ApiDemos',
        }
    });
    console.log('App launched via Appium on Android emulator');

    await driver.$('android=new UiSelector().text("Accessibility")').click();

    await driver.pause(5000); // Wait for 5 seconds to observe the app

    await driver.deleteSession();
}

main();