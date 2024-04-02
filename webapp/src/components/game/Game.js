import { HttpStatusCode } from "axios";
import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();

export async function newGame() {
    try {
        let requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/new");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function startRound(gameId) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/startRound");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function getCurrentQuestion(gameId) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/question");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}

export async function answerQuestion(gameId, aId) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/games/" + gameId + "/answer", {answer_id:aId});
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
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
