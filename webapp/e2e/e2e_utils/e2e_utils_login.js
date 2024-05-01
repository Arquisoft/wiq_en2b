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
modules.export ={loginUserFromRootDirectory};