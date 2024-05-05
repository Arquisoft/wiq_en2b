/**
 * Note: e2e Testing purposes only!
 * Auxiliar function for registering a new user from the root directory of the website.
 * It also ensures the task has been performed successfully.
 *  
 * @param {*} username  The username for the new user. Currently we are using codes for each test case.
 * @param {*} page      The website
 * @returns             An array with the credentials of the user created [email, username]
 */
export async function registerUserFromRootDirectory(username, page) {
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

modules.export ={registerUserFromRootDirectory};