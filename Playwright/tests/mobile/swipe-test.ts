import { remote } from 'webdriverio';

async function swipeUp(driver: WebdriverIO.Browser) {
    await driver.performActions([{
        type: 'pointer', id: 'finger', parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', x: 500, y: 1500, duration: 0 },
            { type: 'pointerDown', button: 0 },
            { type: 'pointerMove', x: 500, y: 300, duration: 2000 },
            { type: 'pointerUp', button: 0 },
        ],
    }]);
}

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
        }
    });

    console.log('Connected to device (no app launched)!');

    await driver.pause(1000);

    await swipeUp(driver);
    console.log('Swiped up on the home screen!');

    await driver.pause(3000);

    await driver.deleteSession();
}

main();