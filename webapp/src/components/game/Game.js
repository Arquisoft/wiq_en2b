import {HttpStatusCode} from "axios";
import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();

export async function isActive() {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/is-active");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function gameCategories(lang) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/question-categories?lang=" + lang);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function gameModes() {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/gamemodes");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function newGame(lang, gamemode, customGameDto) {
    try {
        let requestAnswer;
        if (gamemode === "CUSTOM")
            requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/play?lang=" + lang + "&gamemode=" + gamemode, customGameDto);
        else
            requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/play?lang=" + lang + "&gamemode=" + gamemode);
        
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function startRound(gameId) {
    return await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/startRound");
}

export async function getCurrentQuestion(gameId) {
    return await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/question");
}

export async function changeLanguage(gameId, language) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().put(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/language?language=" + language);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function answerQuestion(gameId, aId) {
    return await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/answer", {answer_id:aId});
}

export async function getGameDetails(gameId) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/details");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

