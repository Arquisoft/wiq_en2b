const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/about_features/positive_non_logged_user_seeing_about_screen.feature');
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

      test("A non-logged user wants to see the about screen of the webpage", ({given,when,and,then}) => {
        
        given("A non-logged user in the main menu", async () => {
            
        });

        when("The user presses the button for deploying the lateral menu", async () => {
            await expect(page).toClick("#lateralMenuButton"); 
        });

        and("the user presses the button for seeing the about section (i)", async () => {
            await expect(page).toClick("#aboutButton");
        });

        then("The user is presented to the about screen", async () => {
            await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
            let header = await page.$eval("h2", (element) => {
                return element.innerHTML
              })
            let value = header === "About" || header === "Sobre nosotros";
            expect(value).toBeTruthy();
        });
      }, 600000);

    afterAll(async (done) => {
        done();
        await browser.close();
    });
});