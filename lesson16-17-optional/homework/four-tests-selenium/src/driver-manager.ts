import { Browser, Builder, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export async function createDriver(): Promise<WebDriver> {
    const options = new chrome.Options();
    options.addArguments('--start-maximized');
    
    return new Builder()
        .forBrowser(Browser.CHROME)
        .setChromeOptions(options)
        .build();
}

export async function closeDriver(driver: WebDriver): Promise<void> {
    await driver.quit();
}


