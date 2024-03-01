import { useContext } from "react";
import { authContext } from "./Auth";
import axios from "axios";

export function useLoggedState() {
    const context = useContext(authContext);
    return context.jwt != null;
}

export async function logIn(loginData, onSuccess, onError) {
    const url = process.env.REACT_APP_API_ENDPOINT + process.env.REACT_APP_LOGIN_ENDPOINT;
    const requestAnswer = await axios.post(url, loginData);

    return {
        status: requestAnswer.status,
        token: requestAnswer.data.token,
        refreshToken: requestAnswer.data.refreshToken
    };
}