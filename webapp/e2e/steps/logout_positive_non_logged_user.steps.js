const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/logout_features/positive_non_logged_user_logout.feature');
let page;
let browser;


defineFeature(feature, test => {
    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
          ? await puppeteer.launch({ ignoreHTTPSErrors: true })
          : await puppeteer.launch({ headless: false, slowMo: 100, ignoreHTTPSErrors: true });
        page = await browser.newPage();
        //Way of setting up the timeout
        setDefaultOptions({ timeout: 10000 })
    
        await page
          .goto("http://localhost:3000", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
      }, 120000);

      test("A non-logged user wants to log out the webpage", ({given,when,then}) => {

        given('A non-logged user in main menu', async () => {
          await new Promise(resolve => setTimeout(resolve, 5000));
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 
        });

        when('User accesses de /logout endpoint via URL', async() => {
          await page
          .goto("http://localhost:3000/logout", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
        });

        then('The login screen shows on the user device', async() => {
          await new Promise(resolve => setTimeout(resolve, 5000));
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});