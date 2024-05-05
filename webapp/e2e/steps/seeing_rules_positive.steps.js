const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/seeing_rules_features/positive_seeing_rules.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.rules.pos"
    let user = username + "@email.com";
    let password = username + "psw";

    beforeAll(async () => {
        browser = process.env.GITHUB_ACTIONS
          ? await puppeteer.launch({ ignoreHTTPSErrors: true })
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
        await registerUserFromRootDirectory(username, page);

        // Logging it out
        await logOutUser(page);
      }, 120000);

      test("A logged user wants to see the rules for the game", ({given,when,and,then}) => {
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
            await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       

          expect(value).toBeTruthy();

        });

        when('The user presses the button for deploying the lateral menu', async() => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
          await expect(page).toClick("#lateralMenuButton"); 

        });

        and('The user presses the button for seeing the rules', async() => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
          await expect(page).toClick("button[data-testid='rules']");

        });

        then("The screen shows redirects the user to the rules' screen", async() => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
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

async function registerUserFromRootDirectory(username, page) {
    // Credentials for the new user
    let email = username + "@email.com"
    let password = username + "psw"

    // Registering process
    await expect(page).toClick("span[class='chakra-link css-1bicqx'");
    await expect(page).toFill("input[id='user'", email);
    await expect(page).toFill("input[id='username'", username);
    await expect(page).toFill("#password", password);
    await expect(page).toFill("input[id='field-:r5:']", password);
    await expect(page).toClick("button[data-testid='Sign up'");

    // Checking for the process to be correct
    await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
    let header = await page.$eval("h2", (element) => {
        return element.innerHTML
    })
    let value = header === "Bienvenid@ " + username || header === "Welcome " + username;
    expect(value).toBeTruthy();

    return [email, password];
}

async function logOutUser(page) {
    // Logging out
    await expect(page).toClick("#lateralMenuButton");
    await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
    await expect(page).toClick("button[data-testid='LogOut']");

    // Checking for the log out to be sucessful
    await new Promise(resolve => setTimeout(resolve, 5000));
    let header = await page.$eval("button[data-testid='Login']", (element) => {
        return element.innerHTML
    })
    let value = header === "Login" || "Iniciar sesión";

    expect(value).toBeTruthy();
}