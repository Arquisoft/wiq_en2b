import { registerUserFromRootDirectory}from '../e2e_utils/e2e_utils_register.js';
import { waitForPageToLoad } from '../e2e_utils/e2e_utils_timeout.js';
import { logOutUser } from '../e2e_utils/e2e_utils_logout.js';
import { loginUserFromRootDirectory } from '../e2e_utils/e2e_utils_login.js'

const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/seeing_stats_features/positive_seeing-stats.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.stats.pos"
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

      test("A logged user with many games wants to see its stats", ({given,when,and,then}) => {
        let gameURL = "http://localhost:3000/dashboard/game";

        given('A logged user in the main menu with many games', async () => {
          // Entering login screen from root directory
          await expect(page).toClick("button[data-testid='Login'");
          
          // Filling the credentials
          await expect(page).toFill("#user", user);
          await expect(page).toFill("#password", password);
          
          // Clicking to send the login request
          await expect(page).toClick("button[data-testid='Login'");
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load

          // Checking user is in main screen
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       

          expect(value).toBeTruthy();

        });

        when('The user presses the button for deploying the lateral menu', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          await expect(page).toClick("#lateralMenuButton"); 

        });

        and('The user presses the button for seeing stats', async() => {
          await expect(page).toClick("button[data-testid='statistics']"); 

        });

        then("It successfully displays both, the leader board and the logged user statistics", async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          let header = await page.$eval("h1[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Estadísiticas" || "Statistics";       

          expect(value).toBeTruthy(); 
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});