import { remote } from 'webdriverio';
import assert from 'assert';

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
        console.log('App launched, checking initial connectivity...');
        await driver.pause(1000);

        const initialState = await driver.execute('mobile: getConnectivity', {});
        console.log('Initial connectivity:', initialState);

        // airplane mode test: set airplane mode ON
        await driver.execute('mobile: setConnectivity', { airplaneMode: true });
        await driver.pause(1000);

        //  assert: verify airplane mode is ON ---
        const airplaneState = await driver.execute('mobile: getConnectivity', {}) as { airplaneMode: boolean };
        assert.strictEqual(airplaneState.airplaneMode, true, 'Expected airplaneMode to be true');
        console.log('✅ Airplane mode confirmed ON at the device level');

    } finally {
        // cleanup: restore connectivity to normal
        await driver.execute('mobile: setConnectivity', { airplaneMode: false, wifi: true, data: true });
        console.log('Connectivity restored to normal.');

        await driver.deleteSession();
    }
}

main();