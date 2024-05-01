const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/playing_game_features/positive_playing_full_game.feature');
let page;
let browser;
let NUMBER_OF_ANSWERS = 4;
let TEST_TIMEOUT = 300 * 1000; // 5minutes
const crypto = require('crypto');


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

      test("A non-logged user wants to play an entire game (Kiwi Quest gamemode)", ({given,when,and,then}) => {
        // Trying to avoid repeated users:
        // Generate random bytes
        let randomBytes = crypto.randomBytes(8); // 8 bytes = 64 bits
        // Convert bytes to hex
        let hexString = randomBytes.toString('hex');
        // Take the first 16 characters
        let randomHash = hexString.substring(0, 8);
  


        let username = "test" + randomHash
        let user = username + "@pepe.com"
        let password = "pepe" + randomHash

        given('A non-logged user in the main menu', async () => {
          // Registering a new user for simplicity of testing purposes
          await expect(page).toClick("span[class='chakra-link css-1bicqx'");
          await expect(page).toFill("input[id='user'", user);
          await expect(page).toFill("input[id='username'", username);
          await expect(page).toFill("#password", password);
          await expect(page).toFill("input[id='field-:r5:']", password);
          await expect(page).toClick("button[data-testid='Sign up'"); 

          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load
          // Checking user is in main screen
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       

          expect(value).toBeTruthy();

        });

        when('Clicking the button to start a new game (Kiwi Quest gamemode)', async() => {
          await expect(page).toClick("button[class='chakra-button css-4ctvp9'");
          await expect(page).toClick("button[data-testid='Play']");
        });

        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting for page to fully load

        });
        
        and('Checking user is on round 1/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 1;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });




        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 2/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 2;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });





        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 3/9', async() => {

          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 3;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });




        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 4/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 4;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });





        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 5/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 5;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });




        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 6/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 6;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });




        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 7/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 7;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });





        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });

        and('Checking user is on round 8/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 8;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });





        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000));
          
        });
        
        and('Checking user is on round 9/9', async() => {
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let round = 9;
          let value = header === "Ronda " + round + " de 9" || header === "Round " + round + " of 9";       
          expect(value).toBeTruthy();
        
        });

        and('Clicking on a random answer', async() => {
          let chosen = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1; // choses a int in between [1,4] (index of answers range)
          await expect(page).toClick("button[data-testid='Option" + chosen + "']");

        });

        and('Sending the answer', async() => {
          await expect(page).toClick("button[data-testid='Next']");
        
        });

        then('The user statistics are shown', async() => {
          await new Promise(resolve => setTimeout(resolve, 6000)); // Waiting till page is loaded
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Resultados" || header === "Results";       

          expect(value).toBeTruthy();
        });
        
      }, TEST_TIMEOUT);

      afterAll((done) => {
        done();
        browser.close();
      });
});