const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/about_features/positive_logged_user_seeing_about_screen.feature');
let page;
let browser;


defineFeature(feature, test => {
    let username = "t.about.pos";

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

      test("A logged user wants to see the about screen of the webpage", ({given,when,and,then}) => {

        given("A logged user in the main menu", async () => {            
            await loginUserFromRootDirectory(username, page);
        });

        when("The user presses the button for deploying the lateral menu", async () => {
            await expect(page).toClick("#lateralMenuButton"); 
        });

        and("the user presses the button for seeing the about section (i)", async () => {
            await expect(page).toClick("#aboutButton");
        });

        then("The user is presented to the about screen", async () => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
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
    await new Promise(resolve => setTimeout(resolve, 5000));
    await expect(page).toClick("button[data-testid='LogOut']");

    // Checking for the log out to be sucessful
    await new Promise(resolve => setTimeout(resolve, 5000));
    let header = await page.$eval("button[data-testid='Login']", (element) => {
        return element.innerHTML
    })
    let value = header === "Login" || "Iniciar sesión";

    expect(value).toBeTruthy();
}
async function loginUserFromRootDirectory(username, page) {
    // Credentials for the new user
    let email = username + "@email.com"
    let password = username + "psw"

    // login process
    await expect(page).toClick("button[data-testid='Login'");
    await expect(page).toFill("#user", email);
    await expect(page).toFill("#password", password);
    await expect(page).toClick("button[data-testid='Login'");

    // Checking for the process to be correct
    await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting for page to fully load
    let header = await page.$eval("h2", (element) => {
        return element.innerHTML
    })
    let value = header === "Bienvenid@ " + username || header === "Welcome " + username;
    expect(value).toBeTruthy();

}