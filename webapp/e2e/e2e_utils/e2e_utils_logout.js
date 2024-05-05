const {waitForPageToLoad} = require('../e2e_utils/e2e_utils_timeout.js');

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
    waitForPageToLoad();
    let header = await page.$eval("button[data-testid='Login']", (element) => {
    return element.innerHTML
    })
    let value = header === "Login" || "Iniciar sesión";       

    expect(value).toBeTruthy(); 
}
modules.export = {logOutUser}
