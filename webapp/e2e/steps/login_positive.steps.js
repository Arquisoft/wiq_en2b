import { registerUserFromRootDirectory}from '../e2e_utils/e2e_utils_register.js';
import { logOutUser } from '../e2e_utils/e2e_utils_logout.js';
import { waitForPageToLoad } from '../e2e_utils/e2e_utils_timeout.js';

const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/login_features/positive_login.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.regis.pos";
    let email;
    let password; 

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
          ? await puppeteer.launch({ ignoreHTTPSErrors: true})
          : await puppeteer.launch({ headless: false, slowMo: 100, ignoreHTTPSErrors: true });
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
         email = credentials[0]; 
         username = credentials[1];
         
         // Logging it out
         logOutUser(page);
      });

      test("A registered user wants to log in using his correct credentials", ({given,when,and,then}) => {

        given('A registered user in the root screen', async () => {
          waitForPageToLoad();
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
          waitForPageToLoad();
          let header = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";        

          expect(value).toBeTruthy();
        });

        and('User fills the form with his credentials properly', async() => {
          await expect(page).toFill("#user", email);
          await expect(page).toFill("#password", password);
        });

        and('User presses the log in button', async() => {
          await expect(page).toClick("button[data-testid='Login'");
        });

        then('The main menu screen shows on the user device', async() => {
          waitForPageToLoad();
          let header = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          console.log("H2 retrieved from webpage: " + header);
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       

          expect(value).toBeTruthy();
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});