import axios from "axios";

export function isUserLogged() {
    return axios.defaults.headers.common["Authorization"] != null;
}

export function saveToken(requestAnswer) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    localStorage.setItem("jwtToken", requestAnswer.data.token);
    localStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_Token)
}

export function login(loginData) {
    return axios.post(process.env.REACT_APP_API_ENDPOINT
        + process.env.REACT_APP_LOGIN_ENDPOINT, loginData);
}