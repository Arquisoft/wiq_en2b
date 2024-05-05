const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/register_form_features/negative_register_blank_repeated_password.feature');

let page;
let browser;


defineFeature(feature, test => {
    let username = "t.reg.neg.bl_r_ps"
    let user = username + "@gmail.com";
    let password = username + ".psw";

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

      test("The user is not registered in the root directory of the website and tries to create an account", ({given,when,and,then}) => {      
        given("An unregistered user", async () => {

        });

        when("The user fills its data in the form leaving the password field in blank", async () => {
            await expect(page).toClick("span[class='chakra-link css-1bicqx'");
            await expect(page).toFill("input[id='user'", user);
            await expect(page).toFill("input[id='username'", username);
            await expect(page).toFill("#password", password); 
            await expect(page).toFill("input[id='field-:r5:']", ""); // Blank password
            
        });

        and("Press Log in button", async () => {
          await expect(page).toClick("button[data-testid='Sign up'");

        });

        then("Log in screen shows an informative error message and does not allow the user to log in", async () => {
              await new Promise(resolve => setTimeout(resolve, 6000));


            let header = await page.$eval("div[class='chakra-alert__desc css-zzks76'", (element) => {
                return element.innerHTML
              })
            let value = header === "La confirmación de contraseña no puede estar vacía" 
                || header === "The confirm password label can not be empty";
            
            expect(value).toBeTruthy();
        });
      }, 600000);

      afterAll((done) => {
        done();
        browser.close();
      });
});





/**
 * Note: e2e Testing purposes only!
 * Auxiliar function for logging out an user from any directory of the user.
 * Beware if the user is playing a game when logging out
 * It also ensures the task has been performed successfully.
 *  
 * @param {*} page      The website
 */
async function logOutUser(page) {
  // Logging out
  await expect(page).toClick("#lateralMenuButton"); 
  await expect(page).toClick("button[data-testid='LogOut']"); 

  // Checking for the log out to be sucessful
      await new Promise(resolve => setTimeout(resolve, 6000));


  let header = await page.$eval("button[data-testid='Login']", (element) => {
  return element.innerHTML
  })
  let value = header === "Login" || "Iniciar sesión";       

  expect(value).toBeTruthy(); 
}

/**
* Note: e2e Testing purposes only!
* Auxiliar function for login an user using its credentials from the root directory of the website.
* It also ensures the task has been performed successfully.
*  
* @param username  The username for the user. Currently we are using codes for each test case.
* @param email     The email for the user. If none is defined, the username (a code) + '@gmail.com' is used
* @param password  The password for the user. If none is defined, the username (a code) + '.ps' is used
*                  Beware of constraits for the user password.
* @param page      The website
*/
async function loginUserFromRootDirectory(username, email = username + "@gmail.com", password = username + ".ps", page) {
  
  // login process
  await expect(page).toClick("button[data-testid='Login'");
  await expect(page).toFill("#user", email);
  await expect(page).toFill("#password", password);
  await expect(page).toClick("button[data-testid='Login'");

  // Checking for the process to be correct
  await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
  let header = await page.$eval("h2", (element) => {
      return element.innerHTML
      })
  let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       
  expect(value).toBeTruthy();

}

/**
* Note: e2e Testing purposes only!
* Auxiliar function for registering a new user from the root directory of the website.
* It also ensures the task has been performed successfully.
*  
* @param {*} username  The username for the new user. Currently we are using codes for each test case.
* @param {*} page      The website
* @returns             An array with the credentials of the user created [email, username]
*/
async function registerUserFromRootDirectory(username, page) {
  // Credentials for the new user
  let email = username + "@email.com"
  let password = username + "ps"

  // Registeing process
  await expect(page).toClick("span[class='chakra-link css-1bicqx'");
  await expect(page).toFill("input[id='user'", email);
  await expect(page).toFill("input[id='username'", username);
  await expect(page).toFill("#password", password);
  await expect(page).toFill("input[id='field-:r5:']", password);
  await expect(page).toClick("button[data-testid='Sign up'");

  // Checking for the process to be correct
  await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
  let header = await page.$eval("h2", (element) => {
      return element.innerHTML
      })
  let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       
  expect(value).toBeTruthy();

  return [email, password];
}

/**
* Note: e2e Testing purposes only!
* Auxiliar function that times out the tests for some time, so the page can be fully loaded.
* @param {*} timeout_ms Amount of ms to wait.
*/
async function waitForPageToLoad(timeout_ms = 6000) {
  await new Promise(resolve => setTimeout(resolve, timeout_ms));

}

