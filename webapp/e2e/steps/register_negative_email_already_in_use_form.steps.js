const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/register_form_features/negative_register_email_already_in_use.feature');
const crypto = require('crypto');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.reg.neg.em_aiu"
    let email = username + "@gmail.com";
    let password = username + ".psw";


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
        await logOutUser(page)

      }, 120000);

      test("The user is not registered in the root directory of the website", ({given,when,and,then}) => {
        given("An unregistered user", async () => {

        });

        when("the user fills the data in the form using an already used email", async () => {
            await expect(page).toClick("span[class='chakra-link css-1bicqx'");
            await expect(page).toFill("input[id='user'", email);
            await expect(page).toFill("input[id='username'", username);
            await expect(page).toFill("#password", password);
            await expect(page).toFill("input[id='field-:r5:']", password);
            
        });

        and("click the sign in button", async () => {
          await expect(page).toClick("button[data-testid='Sign up'");

        });

        then("Log in screen shows an informative error message and does not allow the user to log in", async () => {
          await new Promise(resolve => setTimeout(resolve, 6000));
            let header = await page.$eval("div[class='chakra-alert__desc css-zzks76'", (element) => {
                return element.innerHTML
              })
            let value = header === "Formato de correo electrónico no válido o credenciales (nombre de usuario o correo electrónico) ya en uso" 
                || header === "Invalid email format or credentials (username or email) already in use";
            
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
