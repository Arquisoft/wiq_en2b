import { HttpStatusCode } from "axios";
import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();
export async function getQuestion() {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/questions/new");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}

export async function answerQuestion(questionId, aId) {
    try {
        let requestAnswer = await authManager.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/questions/" + questionId + "/answer", {answer_id:aId});
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}