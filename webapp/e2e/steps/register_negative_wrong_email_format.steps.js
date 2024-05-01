const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/register_form_features/negative_register_wrong_email_format.feature');
const crypto = require('crypto');
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

      test("The user is not registered in the root directory of the website and tries to create an account", ({given,when,and,then}) => {
        // Trying to avoid repeated users:
        // Generate random bytes
        let randomBytes = crypto.randomBytes(8); // 8 bytes = 64 bits
        // Convert bytes to hex
        let hexString = randomBytes.toString('hex');
        // Take the first 16 characters
        let randomHash = hexString.substring(0, 20);
  


        let username = "test" + randomHash
        let user = username + "email.com" // Bad format email
        let password = "password"
            
        given("An unregistered user", async () => {

        });

        when("The user fills its data in the form placing a wrong email format", async () => {
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
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
            let header = await page.$eval("div[class='chakra-alert__desc css-zzks76'", (element) => {
                return element.innerHTML
              })
            let value = header === "Formato de correo electrónico no válido o credenciales (nombre de usuario o correo electrónico) ya en uso" 
                || header === "Invalid email format or credentials (username or email) already in use";
            
            expect(value).toBeTruthy();
        });
      }, 600000);

    afterAll(async (done) => {
        await browser.close();
    });
});