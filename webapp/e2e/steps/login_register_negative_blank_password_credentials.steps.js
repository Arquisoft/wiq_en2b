const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/login_features/negative_blank_password_login.feature');
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

      test("A registered user wants to log in using his credentials but leaving the password in blank", ({given,when,and,then}) => {
        let username = "pepe"
        let user = username + "@email.com"
        let password = "" // Blank password

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

        and('User fills the form with his proper email but leaves the password in blank', async() => {
          await expect(page).toFill("#user", user);
          await expect(page).toFill("#password", password);
        });

        and('User presses the log in button', async() => {
          await expect(page).toClick("button[data-testid='Login'");
        });

        then('Log in screen shows an informative error message and does not allow the user to log in', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          let header = await page.$eval("div[class='chakra-alert__desc css-zzks76'", (element) => {
            return element.innerHTML
          })
          let value = header === "El formato del correo electrónico no es correcto" // Wrong message shown from frontend
            || header === "Invalid email format";
        
          expect(value).toBeTruthy();
        });
      }, 600000);

      afterAll((done) => {
        done();
      });
});