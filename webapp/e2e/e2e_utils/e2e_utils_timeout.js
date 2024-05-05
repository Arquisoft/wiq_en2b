/**
 * Note: e2e Testing purposes only!
 * Auxiliar function that times out the tests for some time, so the page can be fully loaded.
 * @param {*} timeout_ms Amount of ms to wait.
 */
async function waitForPageToLoad(timeout_ms = 6000) {
    await new Promise(resolve => setTimeout(resolve, timeout_ms));

}

modules.export = {waitForPageToLoad}