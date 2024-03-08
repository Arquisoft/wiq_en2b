import axios, { HttpStatusCode } from "axios";

export async function getQuestion(onError) {
    try {
        let requestAnswer = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/questions/new");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        } else {
            onError();
        }
    } catch {
        onError();
    }
}