require('chromedriver');

const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

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