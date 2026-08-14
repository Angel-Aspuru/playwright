import fs from 'fs';
import path from 'path';

/**
 * Captures the maximum diagnostic context available at the moment of a failure:
 * - screenshot (what the screen looked like)
 * - page source (the XML element tree - "gold for debugging" per the concept)
 * - device logs (logcat, Android-specific)
 *
 * Everything is saved into a timestamped folder under diagnostics/, so multiple
 * failures across a test run don't overwrite each other - and so this whole
 * folder can be zipped/uploaded as a single CI artifact.
 */
export async function captureFailureDiagnostics(driver: WebdriverIO.Browser, testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = path.join('diagnostics', `${testName}-${timestamp}`);
    fs.mkdirSync(dir, { recursive: true });

    // 1. Screenshot - the fastest way to see "what did the screen actually show"
    try {
        const screenshotPath = path.join(dir, 'screenshot.png');
        await driver.saveScreenshot(screenshotPath);
        console.log(`Saved screenshot: ${screenshotPath}`);
    } catch (err) {
        console.error('Failed to capture screenshot:', err);
    }

    // 2. Page source - the full XML element tree at the moment of failure.
    // This is often more useful than the screenshot itself: it tells you whether
    // an element was missing entirely, present but not visible, or had different
    // attributes than expected.
    try {
        const source = await driver.getPageSource();
        const sourcePath = path.join(dir, 'page-source.xml');
        fs.writeFileSync(sourcePath, source);
        console.log(`Saved page source: ${sourcePath}`);
    } catch (err) {
        console.error('Failed to capture page source:', err);
    }

    // 3. Device logs (logcat) - Android's system/app log. Catches things neither
    // the screenshot nor the element tree can show: crashes, permission denials,
    // network errors, stack traces from the app itself.
    try {
        const logs = await driver.getLogs('logcat');
        const logsPath = path.join(dir, 'logcat.json');
        fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
        console.log(`Saved device logs: ${logsPath}`);
    } catch (err) {
        console.error('Failed to capture device logs:', err);
    }

    return dir;
}