import axios, { HttpStatusCode } from "axios";

class AuthManager {
  static #instance = null;
  #isLoggedIn = false;
  #axiosInstance = null;

  constructor() {
    if (!AuthManager.#instance) {
      this.#axiosInstance = axios.create();
      AuthManager.#instance = this;
    }
  }

  setLoggedIn(value) {
    this.#isLoggedIn = value;
  }

  isLoggedIn() {
    return this.#isLoggedIn;
  }

  static getInstance() {
    return AuthManager.#instance;
  }

  async login(loginData, onSuccess, onError) {
    try {
        let requestAnswer = await this.#axiosInstance.post(process.env.REACT_APP_API_ENDPOINT + "/auth/login", loginData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            this.#saveToken(requestAnswer);
            onSuccess();
        } else {
            throw requestAnswer;
        }
    } catch (error) {
        let errorType;
        switch (error.response ? error.response.status : null) {
            case 400:
                errorType = { type: "error.validation.type", message: "error.validation.message"};
                break;
            case 401:
                errorType = { type: "error.authorized.type", message: "error.authorized.message"};
                break;
            default:
                errorType = { type: "error.unknown.type", message: "error.unknown.message"};
                break;
        }
        onError(errorType);
    }
  }

  async logout() {
    try {
      await axios.get(process.env.REACT_APP_API_ENDPOINT + "/auth/logout");
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("jwtRefreshToken");
  } catch (error) {
      console.error("Error logging out user: ", error);
  }
  }

  #saveToken(requestAnswer) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    sessionStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_token);
    sessionStorage.setItem("jwtReceptionMillis", Date.now().toString());
  }

  async register(registerData, onSuccess, onError) {
    try {
        let requestAnswer = await axios.post(process.env.REACT_APP_API_ENDPOINT + "/auth/register", registerData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            this.#saveToken(requestAnswer);
            onSuccess();
        } else {
            throw requestAnswer;
        }
    } catch (error) {
        let errorType;
        switch (error.response ? error.response.status : null) {
            case 400:
                errorType = { type: "error.validation.type", message: "error.validation.message"};
                break;
            case 409:
                errorType = { type: "error.conflict.type", message: "error.conflict.message"};
                break;
            default:
                errorType = { type: "error.unknown.type", message: "error.unknown.message"};
                break;
        }
        onError(errorType);
    }
}
}

export default AuthManager;
