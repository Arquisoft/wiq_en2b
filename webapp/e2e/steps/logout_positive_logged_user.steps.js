const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/logout_features/positive_logged_user_logout.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.logOu.pos.logged"
    let userEmail;
    let password;

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

             // Registering the user before the tests
        let credentials = registerUserFromRootDirectory(username, page);
        userEmail = credentials[0]; 
        username = credentials[1];
      }, 120000);

      test("A logged user wants to log out the webpage", ({given,when,and,then}) => {
        let gameURL = "http://localhost:3000/dashboard/game";

        given('A logged user in main menu', async () => {
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 

          
          waitForPageToLoad();
          let newHeader = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          let newValue = newHeader === "Bienvenid@ " + username || header === "Welcome " + username;       
          expect(newValue).toBeTruthy();
        });

        when('User presses the button for deploying the lateral menu', async() => {
          waitForPageToLoad();
          await expect(page).toClick("#lateralMenuButton"); 

        });

        and('User presses the log out button', async() => {
          await expect(page).toClick("button[data-testid='LogOut']"); 

        });

        then('The login screen shows on the user device and the user is no longer logged in', async() => {
          waitForPageToLoad();
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

async function waitForPageToLoad (timeout_ms = 6000) {
  await new Promise(resolve => setTimeout(resolve, timeout_ms));
}