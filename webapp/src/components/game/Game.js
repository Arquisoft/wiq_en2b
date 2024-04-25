import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();

export async function isActive() {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/is-active");
}

export async function getCurrentGame() {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/play");
}

export async function gameCategories(lang) {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/question-categories?lang=" + lang);
}

export async function gameModes() {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/gamemodes");
}

export async function newGame(lang, gamemode, customGameDto) {
    let requestAnswer;
    if (gamemode === "CUSTOM") {
        requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/play?lang=" + lang + "&gamemode=" + gamemode, customGameDto);
    } else {
        requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/play?lang=" + lang + "&gamemode=" + gamemode);
    }
    
    return requestAnswer;
}

export async function startRound(gameId) {
    return await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/startRound");
}

export async function getCurrentQuestion(gameId) {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/question");
}

export async function changeLanguage(gameId, language) {
    await authManager.getAxiosInstance().put(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/language?language=" + language);
}

export async function answerQuestion(gameId, aId) {
    return await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/answer", {answer_id:aId});
}

export async function getGameDetails(gameId) {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/details");
}

