const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

require('chromedriver');


describe('App UI', function() {
    let driver;
    
    beforeAll(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    it('should have a title', async function() {
        await driver.get('http://localhost:3000/');
        const title = await driver.getTitle();
        assert.equal(title, 'TukTuk');
    });

    it('should have a header', async function() {
        await driver.get('http://localhost:3000/');
        const header = await driver.findElement(By.css('span.self-center.text-xl.font-bold.whitespace-nowrap.mr-5')).getText();
        assert.equal(header, 'TukTuk');
    });
    
    afterAll(() => driver && driver.quit());
});

describe('Login Test', function() {
    let driver;

    beforeAll(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should log in with incorrect credentials', async function() {
        await driver.get('http://localhost:3000/login'); // replace with your login page URL

        let usernameField = await driver.findElement(By.name('username')); // replace with your username field name
        let passwordField = await driver.findElement(By.name('password')); // replace with your password field name

        await usernameField.sendKeys('testuser'); // replace with your test username
        await passwordField.sendKeys('wrongpassword'); // replace with your wrong password

        let loginButton = await driver.findElement(By.css('button[type="submit"]')); // replace with your login button selector
        await loginButton.click();

        await driver.sleep(2000); // Add delay

        // after login check if the user is redirected to home page
        await driver.wait(until.urlIs('http://localhost:3000/login')); // replace with your home page URL
    });

    it('should log in with correct credentials', async function() {
        await driver.get('http://localhost:3000/login'); // replace with your login page URL

        let usernameField = await driver.findElement(By.name('username')); // replace with your username field name
        let passwordField = await driver.findElement(By.name('password')); // replace with your password field name

        await usernameField.sendKeys('testuser'); // replace with your test username
        await passwordField.sendKeys('testpassword'); // replace with your test password

        let loginButton = await driver.findElement(By.css('button[type="submit"]')); // replace with your login button selector
        await loginButton.click();

        await driver.sleep(2000); // Add delay

        // after login check if the user is redirected to home page
        await driver.wait(until.urlIs('http://localhost:3000/')); // replace with your home page URL
    });

    afterAll(async function() {
        await driver.quit();
    });
});
