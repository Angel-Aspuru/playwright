import fs from 'fs';
import path from 'path';

/**
 * Lighter version of captureFailureDiagnostics (see diagnostics.ts) -
 * only screenshot + page source, no logcat. Use this when you specifically
 * want the "what did it look like" + "what did the element tree say" evidence
 * without the noise of a full device log dump.
 */
export async function captureScreenshotAndSource(driver: WebdriverIO.Browser, testName: string) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const dir = path.join('diagnostics', `${testName}-${timestamp}`);
    fs.mkdirSync(dir, { recursive: true });

    try {
        const screenshotPath = path.join(dir, 'screenshot.png');
        await driver.saveScreenshot(screenshotPath);
        console.log(`Saved screenshot: ${screenshotPath}`);
    } catch (err) {
        console.error('Failed to capture screenshot:', err);
    }

    try {
        const source = await driver.getPageSource();
        const sourcePath = path.join(dir, 'page-source.xml');
        fs.writeFileSync(sourcePath, source);
        console.log(`Saved page source: ${sourcePath}`);
    } catch (err) {
        console.error('Failed to capture page source:', err);
    }

    return dir;
}