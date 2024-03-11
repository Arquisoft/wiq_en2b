import axios, { HttpStatusCode } from "axios";

export async function getQuestion() {
    try {
        let requestAnswer = await axios.get("http://98.66.168.12:8080" + "/questions/new");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}

export async function answerQuestion(questionId, aId) {
    try {
        let requestAnswer = await axios.post("http://98.66.168.12:8080" + "/questions/" + questionId + "/answer", {answer_id:aId});
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {
        
    }
}