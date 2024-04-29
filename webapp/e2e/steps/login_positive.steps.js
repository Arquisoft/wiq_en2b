const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/login_features/positive_login.feature');
let page;
let browser;


defineFeature(feature, test => {

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
          ? await puppeteer.launch()
          : await puppeteer.launch({ headless: false, slowMo: 100 });
        page = await browser.newPage();
        //Way of setting up the timeout
        setDefaultOptions({ timeout: 10000 })
    
        await page
          .goto("http://localhost:3000", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
      });

      test("A registered user wants to log in using his correct credentials", ({given,when,and,then}) => {
        let username = "pepe"
        let user = username + "@pepe.com"
        let password = "pepe"

        given('A registered user in the root screen', async () => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 
        });

        when('User presses the log in button', async() => {
          await expect(page).toClick("button[data-testid='Login'");
        });

        and('User enters in the log in screen', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          let header = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";        

          expect(value).toBeTruthy();
        });

        and('User fills the form with his credentials properly', async() => {
          await expect(page).toFill("#user", user);
          await expect(page).toFill("#password", password);
        });

        and('User presses the log in button', async() => {
          await expect(page).toClick("button[data-testid='Login'");
        });

        then('The main menu screen shows on the user device', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          let header = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       

          expect(value).toBeTruthy();
        });
      }, 600000);

      afterAll((done) => {
        done();
      });
});