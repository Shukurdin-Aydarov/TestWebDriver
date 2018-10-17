import * as path from "path";
import { Builder } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import * as ie from "selenium-webdriver/ie";

suite("WebDriverTests", () => {
    test("Chrome: Execute js", async () => {
        configureChrome();

        const driver = new Builder()
            .forBrowser("chrome")
            .build();

        await driver.executeScript(() => console.log('Hello!'));
    });

    test("IE: execute js", async () => {
        setDriverPath();

        const driver = new Builder()
            .forBrowser("ie")
            .build();

        await driver.executeAsyncScript(() => console.log('Hello!'));
    });

    test.only("IE: execute async js", async () => {
        setDriverPath();

        const driver = new Builder()
            .forBrowser("ie")
            .build();

        const start = new Date().getTime();
        await driver.executeAsyncScript(() => window.setTimeout(()=> console.log("Hello!"), 500));
        console.log('Elapsed time: ' + (new Date().getTime() - start) + ' ms');
    });

    test("IE: forceCreateProcessApi", async () => {
        setDriverPath();

        const options = new ie.Options()
            .forceCreateProcessApi(true)
            .ensureCleanSession(true);

        const driver = new Builder()
            .forBrowser("ie")
            .setIeOptions(options)
            .build();

        await driver.get("www.google.com");
    });

    test("Firefox: Execute js", async () => {
        setDriverPath();

        const driver = new Builder()
            .forBrowser("firefox")
            .build();

        await driver.executeScript(() => console.log('Hello!'));
    });

    test("Firefox: Execute async js", async () => {
        setDriverPath();

        const driver = new Builder()
            .forBrowser("firefox")
            .build();

        var start = new Date().getTime();
        await driver.executeAsyncScript('window.setTimeout(arguments[arguments.length - 1], 500);');
        console.log('Elapsed time: ' + (new Date().getTime() - start) + ' ms');
    });
});

function configureChrome() {
    const driverPath = path.join(__dirname, "../drivers", "chromedriver.exe");
    chrome.setDefaultService(new chrome.ServiceBuilder(driverPath).build());
}

function setDriverPath() {
    const driversFolder = path.join(__dirname, "../drivers");
    if (!process.env.PATH) {
        process.env.PATH = driversFolder;
    }
    else if (!process.env.PATH.includes(driversFolder)) {
        process.env.PATH += ";" + driversFolder;
    }
}