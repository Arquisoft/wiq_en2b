import axios, { HttpStatusCode } from "axios";

export function isUserLogged() {
    return getLoginData().jwtToken !== null;
}

export function saveToken(requestAnswer) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    sessionStorage.setItem("jwtToken", requestAnswer.data.token);
    sessionStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_token);
    sessionStorage.setItem("jwtReceptionMillis", Date.now().toString());
}

export function getLoginData() {
    return {
        "jwtToken": sessionStorage.getItem("jwtToken"),
        "jwtRefreshToken": sessionStorage.getItem("jwtRefreshToken"),
        "jwtReceptionDate": new Date(sessionStorage.getItem("jwtReceptionMillis"))
    };
}

export async function login(loginData, onSuccess, onError) {
    try {
        let requestAnswer = await axios.post("http://98.66.168.12:8080" + "/auth/login", loginData);
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

export async function register(registerData, onSuccess, onError) {
    try {
        let requestAnswer = await axios.post("http://98.66.168.12:8080" + "/auth/register", registerData);
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
