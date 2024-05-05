const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/login_features/positive_login.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.log.pos";
    let email = username + "@email.com";
    let password = username + "psw";

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
          await registerUserFromRootDirectory(username, page);
         
          // Logging it out
          await logOutUser(page);

      }, 120000);

      test("A registered user wants to log in using his correct credentials", ({given,when,and,then}) => {

        given('A registered user in the root screen', async () => {
          await new Promise(resolve => setTimeout(resolve, 6000));
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
          await new Promise(resolve => setTimeout(resolve, 6000));
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
          await new Promise(resolve => setTimeout(resolve, 6000));
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