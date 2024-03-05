import axios, { HttpStatusCode } from "axios";

export function isUserLogged() {
    return localStorage.getItem("authData") !== null;
}

export function saveToken(requestAnswer) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    localStorage.setItem("authData", {
        "jwtToken": requestAnswer.data.token,
        "refreshToken": requestAnswer.data.refresh_Token,
        "receivedOnUTC": Date.now()
    });
}

export async function login(loginData, onSuccess, onError) {
    try {
        let requestAnswer =  await axios.post(process.env.REACT_APP_API_ENDPOINT
            + process.env.REACT_APP_LOGIN_ENDPOINT, loginData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            saveToken(requestAnswer);
            onSuccess();
        } else {
            onError();
        }
    } catch {
        onError();
    }
}