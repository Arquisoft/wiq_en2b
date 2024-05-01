const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/seeing_rules_features/positive_seeing_rules.feature');
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

      test("A logged user wants to see the rules for the game", ({given,when,and,then}) => {
        let username = "pepe"
        let user = username + "@pepe.com"
        let password = "pepe"

        let gameURL = "http://localhost:3000/dashboard/game";

        given('A logged user in the main menu', async () => {
          // Entering login screen from root directory
          await expect(page).toClick("button[data-testid='Login'");
          
          // Filling the credentials
          await expect(page).toFill("#user", user);
          await expect(page).toFill("#password", password);
          
          // Clicking to send the login request
          await expect(page).toClick("button[data-testid='Login'");

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

        and('The user presses the button for seeing the rules', async() => {
          await expect(page).toClick("button[data-testid='rules']"); 

        });

        then("The screen shows redirects the user to the rules' screen", async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Rules" || "Reglas";       

          expect(value).toBeTruthy(); 
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});