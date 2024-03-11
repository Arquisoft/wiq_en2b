import axios, { HttpStatusCode } from "axios";

export async function getQuestion() {
    try {
        let requestAnswer = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/questions/new");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}

export async function answerQuestion(questionId, aId) {
    try {
        let requestAnswer = await axios.post(process.env.REACT_APP_API_ENDPOINT + "/questions/" + questionId + "/answer", {answer_id:aId});
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}