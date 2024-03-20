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
        let requestAnswer = await axios.post(process.env.REACT_APP_API_ENDPOINT + "/auth/login", loginData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            saveToken(requestAnswer);
            onSuccess();
        } else {
            throw requestAnswer;
        }
    } catch (error) {
        let errorType;
        switch (error.response ? error.response.status : null) {
            case 400:
                errorType = { type: "Validation", message: "Datos incorrectos."};
                break;
            case 401:
                errorType = { type: "Unauthorized", message:"El usuario no está autorizado para acceder al formulario de login. Por favor, inicie sesión."};
                break;
            default:
                errorType = { type: "Unknown", message: "Error desconocido."};
                break;
        }
        onError(errorType);
    }
}

export async function register(registerData, onSuccess, onError) {
    try {
        let requestAnswer = await axios.post(process.env.REACT_APP_API_ENDPOINT + "/auth/register", registerData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            saveToken(requestAnswer);
            onSuccess();
        } else {
            throw requestAnswer;
        }
    } catch (error) {
        let errorType;
        switch (error.response ? error.response.status : null) {
            case 400:
                errorType = { type: "Validation", message: "Datos incorrectos."};
                break;
            case 409:
                errorType = { type: "Conflict", message: "Usuario ya existe."};
                break;
            default:
                errorType = { type: "Unknown", message: "Error desconocido."};
                break;
        }
        onError(errorType);
    }
}
