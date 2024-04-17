import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();

export async function newGame() {
    await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/play");
}

export async function getCurrentGame() {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/play");
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

