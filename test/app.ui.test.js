const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { execPath } = require('process');

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

        await driver.sleep(1000); // Add delay

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

        await driver.sleep(1000); // Add delay

        // after login check if the user is redirected to home page
        await driver.wait(until.urlIs('http://localhost:3000/')); // replace with your home page URL
    });

    it('should go to image and like image', async function() {
        await driver.get('http://localhost:3000'); // replace with your page URL
    
        let firstImage = await driver.findElement(By.css('#card-grid img')); // finds the first image in the card grid
        await firstImage.click();
    
        await driver.wait(until.urlMatches(/^http:\/\/localhost:3000\/pin\/.+/), 5000); // waits up to 5000ms for the URL to match the pattern
        
        let likeButton = await driver.findElement(By.id('like-button')); // finds the like button
        let likeCountBefore = await driver.findElement(By.id('like-count')).getText(); // finds the like count
        console.log('liked');
        console.log(likeCountBefore);
        await likeButton.click();
        await driver.sleep(2000); // Add delay
        let likeCountAfter = await driver.findElement(By.id('like-count')).getText();
        console.log(likeCountAfter);
        expect (likeCountAfter).toBe('Likes: 1');
    });

    it('should go to image and unlike image', async function() {
        await driver.get('http://localhost:3000'); // replace with your page URL
    
        let firstImage = await driver.findElement(By.css('#card-grid img')); // finds the first image in the card grid
        await firstImage.click();
    
        await driver.wait(until.urlMatches(/^http:\/\/localhost:3000\/pin\/.+/), 5000); // waits up to 5000ms for the URL to match the pattern
        
        let likeButton = await driver.findElement(By.id('like-button')); // finds the like button
        let likeCountBefore = await driver.findElement(By.id('like-count')).getText(); // finds the like count
        console.log('unliked');
        console.log(likeCountBefore);
        await likeButton.click();
        await driver.sleep(2000); // Add delay
        let likeCountAfter = await driver.findElement(By.id('like-count')).getText();
        console.log(likeCountAfter);
        expect (likeCountAfter).toBe('Likes: 0');
    });

    afterAll(async function() {
        await driver.quit();
    });
});

// Download test
describe('Download Test', function() {
    let driver;
    let downloadDir = path.join(__dirname, 'downloads');

    beforeAll(async function() {
        let chromeOptions = new chrome.Options();
        chromeOptions.setUserPreferences({
            'download.default_directory': downloadDir,
            'download.prompt_for_download': false,
            'download.directory_upgrade': true,
            'safebrowsing.enabled': true
        });

        driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    });

    it('should navigate to the correct URL when the first image is clicked', async function() {
        await driver.get('http://localhost:3000'); // replace with your page URL
    
        let firstImage = await driver.findElement(By.css('#card-grid img')); // finds the first image in the card grid
        await firstImage.click();
    
        await driver.wait(until.urlMatches(/^http:\/\/localhost:3000\/pin\/.+/), 5000); // waits up to 5000ms for the URL to match the pattern
    
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toMatch(/^http:\/\/localhost:3000\/pin\/.+/); // expects the current URL to start with 'http://localhost:3000/pin/' followed by any characters
        
    });

    it('should download the image when the download button is clicked', async function() {
        let downloadButton = await driver.findElement(By.id('download-btn')); // finds the download button
        await downloadButton.click();
    
        await driver.wait(async function() {
            let files = await fs.promises.readdir(downloadDir);
            return files.length > 0;
        }, 5000); // waits up to 5000ms for the download to complete
    
        let files = await fs.promises.readdir(downloadDir);
        expect(files.length).toBeGreaterThan(0); // expects the download directory to contain at least one file

        await driver.sleep(1000); // Add delay
    });


    afterAll(async function() {
        await driver.quit();
    }, 10000);
});

//search test
describe('Search Test', function() {
    let driver;
    
    beforeAll(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    it('should search for an image', async function() {
        await driver.get('http://localhost:3000'); // replace with your page URL
    
        let searchField = await driver.findElement(By.id('searchInput')); // finds the search field
        await searchField.sendKeys('pang', Key.RETURN); // types 'pang' into the search field and presses Enter
    
        await driver.sleep(2000); // Add delay
    
        let currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toEqual('http://localhost:3000/search/pang'); // expects the current URL to be 'http://localhost:3000/search/pang'
    }, 10000);

    afterAll(async function() {
        await driver.quit();
    });
});
