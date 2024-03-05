import axios, { HttpStatusCode } from "axios";

export function isUserLogged() {
    console.log(localStorage.getItem("jwtToken"))
    return localStorage.getItem("jwtToken") !== null;
}

export function saveToken(requestAnswer) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    localStorage.setItem("jwtToken", requestAnswer.data.token);
    localStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_Token)
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