import { registerUserFromRootDirectory}from '../e2e_utils/e2e_utils_register.js';
import { waitForPageToLoad } from '../e2e_utils/e2e_utils_timeout.js';
import { logOutUser } from '../e2e_utils/e2e_utils_logout.js';
import { loginUserFromRootDirectory } from '../e2e_utils/e2e_utils_login.js'

const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/seeing_rules_features/negative_non_logged_user_seeing_rules.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.rules.neg"
    let user;
    let password;


    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
          ? await puppeteer.launch()
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

      test("A non-logged user wants to see the rules for the game", ({given,when,then}) => {
        let gameURL = "http://localhost:3000/dashboard/game";

        given('A non-logged user in main menu', async () => {
          waitForPageToLoad();
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 
        });

        when('User accesses de /rules endpoint via URL', async() => {
          await page
          .goto("http://localhost:3000/dashboard/rules", {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
        });

        then('The user is redirected to the log in screen', async() => {
          waitForPageToLoad();
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
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