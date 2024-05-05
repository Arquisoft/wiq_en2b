const { defineFeature, loadFeature }=require('jest-cucumber');
const puppeteer = require('puppeteer');
const setDefaultOptions = require("expect-puppeteer").setDefaultOptions;
const feature = loadFeature('./features/playing_game_features/positive_playing_full_game.feature');
let page;
let browser;
let NUMBER_OF_ANSWERS = 4;
let TEST_TIMEOUT = 300 * 1000; // 5minutes


defineFeature(feature, test => {
    let username = "t.playing.pos"
    let email = username + "@gmail.com"
    let password = username + ".psw"


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

          // Registering process
          await expect(page).toClick("span[class='chakra-link css-1bicqx'");
          await expect(page).toFill("input[id='user'", email);
          await expect(page).toFill("input[id='username'", username);
          await expect(page).toFill("#password", password);
          await expect(page).toFill("input[id='field-:r5:']", password);
          await expect(page).toClick("button[data-testid='Sign up'");
        
          // Checking for the process to be correct
          await new Promise(resolve => setTimeout(resolve, 6000));
        
      },120000);

      test("A logged user wants to play an entire game (Kiwi Quest gamemode)", ({given,when,and,then}) => {

        given('A logged user in the main menu', async () => {
          await new Promise(resolve => setTimeout(resolve, 6000));

          // Checking user is in main screen
          let header = await page.$eval("h2", (element) => {
            return element.innerHTML
          })
          let value = header === "Bienvenid@ " + username || header === "Welcome " + username;       
          console.log(header)
          //expect(value).toBeTruthy();

        });

        when('Clicking the button to start a new game (Default gamemode)', async() => {
          await expect(page).toClick("button[data-testid='Mode-KIWI_QUEST'");
          await expect(page).toClick("button[data-testid='Play']");
        });

        and('Waiting for the question to load', async() => {
          await new Promise(resolve => setTimeout(resolve, 5000));

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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000));
          
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
          await new Promise(resolve => setTimeout(resolve, 5000)); // Waiting till page is loaded
          let header = await page.$eval("h2[class='chakra-heading css-79qjat']", (element) => {
            return element.innerHTML
          })
          let value = header === "Resultados" || header === "Results";       

          expect(value).toBeTruthy();
        });
        
      }, TEST_TIMEOUT);

      afterAll((done) => {
        done();
        //browser.close();
      });
});

async function waitForPageToLoad(timeout_ms = 5000) {
  await new Promise(resolve => setTimeout(resolve, timeout_ms));

}

async function loginUserFromRootDirectory(username, email = username + "@gmail.com", password = username + ".ps", page) {
    
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
  await expect(page).toClick("button[data-testid='LogOut']"); 

  // Checking for the log out to be sucessful
  await new Promise(resolve => setTimeout(resolve, 5000));
  let header = await page.$eval("button[data-testid='Login']", (element) => {
  return element.innerHTML
  })
  let value = header === "Login" || "Iniciar sesión";       

  expect(value).toBeTruthy(); 
}