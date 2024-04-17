import {HttpStatusCode} from "axios";
import AuthManager from "components/auth/AuthManager";

const authManager = new AuthManager();

export async function userInfo() {
    try {
        let requestAnswer = await authManager.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/users/details");
        if (HttpStatusCode.Ok === requestAnswer.status) {
            return requestAnswer.data;
        }
    } catch {

    }
}