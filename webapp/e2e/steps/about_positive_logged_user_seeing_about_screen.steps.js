
const {registerUserFromRootDirectory} = require('../e2e_utils/e2e_utils_register.js');
const {waitForPageToLoad} = require('../e2e_utils/e2e_utils_timeout.js');
const {logOutUser} = require('../e2e_utils/e2e_utils_logout.js');
const {loginUserFromRootDirectory} = require('../e2e_utils/e2e_utils_login.js');
const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/about_features/positive_logged_user_seeing_about_screen.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.about.pos";
    let email;
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
        email = credentials[0]; 
        username = credentials[1];
        
        // Logging it out
        logOutUser(page);

      }, 120000);

      test("A logged user wants to see the about screen of the webpage", ({given,when,and,then}) => {

        given("A logged user in the main menu", async () => {            
            loginUserFromRootDirectory(username, email, password, page);
        });

        when("The user presses the button for deploying the lateral menu", async () => {
            await expect(page).toClick("#lateralMenuButton"); 
        });

        and("the user presses the button for seeing the about section (i)", async () => {
            await expect(page).toClick("#aboutButton");
        });

        then("The user is presented to the about screen", async () => {
            waitForPageToLoad();
            let header = await page.$eval("h2", (element) => {
                return element.innerHTML
              })
            let value = header === "About" || header === "Sobre nosotros";
            expect(value).toBeTruthy();
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});