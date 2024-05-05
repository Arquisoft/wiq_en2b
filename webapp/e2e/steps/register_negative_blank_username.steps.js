const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/register_form_features/negative_register_blank_username.feature');

let page;
let browser;


defineFeature(feature, test => {
    let username = "t.reg.blk_un"
    let user = username + "@gmail.com";
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
      }, 120000);

      test("The user is not registered in the root directory of the website and tries to create an account", ({given,when,and,then}) => {
         
        given("An unregistered user", async () => {

        });

        when("The user fills its data in the form leaving the username field in blank", async () => {
            await expect(page).toClick("span[class='chakra-link css-1bicqx'");
            await expect(page).toFill("input[id='user'", user);
            await expect(page).toFill("input[id='username'", "");
            await expect(page).toFill("#password", password);
            await expect(page).toFill("input[id='field-:r5:']", password);
            
        });

        and("Press Log in button", async () => {
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


