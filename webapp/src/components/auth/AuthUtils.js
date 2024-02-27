import { useContext } from "react";
import { authContext } from "./Auth";
import axios from "axios";

export function isLoggedIn() {
    const context = useContext(authContext);

    return context.jwt != null;
}

export async function logIn(loginData) {
    const requestAnswer = await axios.post(process.env.API_URL + 
                                            process.env.LOGIN_ENDPOINT, loginData);
    
    // TODO: Compare response with the status code
}