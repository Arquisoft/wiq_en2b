const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/playing_game_features/negative_non_logged_user_playing_game.feature');
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

      test("A non-logged user wants to play a new game", ({given,when,then}) => {
        let username = "pepe"
        let user = username + "@pepe.com"
        let password = "pepe"

        let gameURL = "http://localhost:3000/dashboard/game";

        given('A non-logged user in the root directory', async () => {

        });

        when('Entering the endpoint via URL', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          await page
          .goto(gameURL, {
            waitUntil: "networkidle0",
          })
          .catch(() => {});
        });



        then('No new game is created and the user is redirected to the log in screen', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          let header = await page.$eval("button[data-testid='Login']", (element) => {
            return element.innerHTML
          })
          let value = header === "Login" || "Iniciar sesión";       

          expect(value).toBeTruthy(); 
        });
      }, 600000);

  afterAll(async (done) => {
    await browser.close();
  });
});