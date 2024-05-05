import { registerUserFromRootDirectory}from '../e2e_utils/e2e_utils_register.js';
import { waitForPageToLoad } from '../e2e_utils/e2e_utils_timeout.js';
import { logOutUser } from '../e2e_utils/e2e_utils_logout.js';
import { loginUserFromRootDirectory } from '../e2e_utils/e2e_utils_login.js'

const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/register_form_features/negative_register_username_already_in_use.feature');

let page;
let browser;


defineFeature(feature, test => {
    let username = "t.reg.neg.un_aiu"
    let user;
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
      }, 120000);

      test("The user is not registered in the root directory of the website and tries to create an account", ({given,when,and,then}) => {
        given("An unregistered user", async () => {

        });

        when("The user fills the data in the form using an already used username", async () => {
            await expect(page).toClick("span[class='chakra-link css-1bicqx'");
            await expect(page).toFill("input[id='user'", user);
            await expect(page).toFill("input[id='username'", username);
            await expect(page).toFill("#password", password);
            await expect(page).toFill("input[id='field-:r5:']", password);
            
        });

        and("Press Log in button", async () => {
          await expect(page).toClick("button[data-testid='Sign up'");

        });

        then("Log in screen shows an informative error message and does not allow the user to log in", async () => {
          waitForPageToLoad();
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