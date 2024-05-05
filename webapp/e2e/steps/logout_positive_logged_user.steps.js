const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/logout_features/positive_logged_user_logout.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "logout_p_logged"

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

      }, 120000);

      test("A logged user wants to log out the webpage", ({given,when,and,then}) => {
        given('A logged user in main menu', async () => {
            // Registering the user before the tests
            await registerUserFromRootDirectory(username, page);
        });

        when('User presses the button for deploying the lateral menu', async() => {
            await new Promise(resolve => setTimeout(resolve, 5000));
          await expect(page).toClick("#lateralMenuButton"); 

        });

        and('User presses the log out button', async() => {
          await expect(page).toClick("button[data-testid='LogOut']"); 

        });

        then('The login screen shows on the user device and the user is no longer logged in', async() => {
            await new Promise(resolve => setTimeout(resolve, 5000));
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

