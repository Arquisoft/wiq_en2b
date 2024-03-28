import axios, { HttpStatusCode } from "axios";

export default class AuthManager {
  
  static #instance = null;
  #isLoggedIn = false;
  #axiosInstance = null;

  constructor() {
    if (!AuthManager.#instance) {
      AuthManager.#instance = this;
      AuthManager.#instance.#axiosInstance = axios.create();
    }
  }

  getAxiosInstance() {
    return AuthManager.#instance.#axiosInstance;
  }

  setLoggedIn(value) {
    AuthManager.#instance.#isLoggedIn = value;
  }

  isLoggedIn() {
    return AuthManager.#instance.#isLoggedIn;
  }

  static getInstance() {
    return AuthManager.#instance;
  }

  async login(loginData, onSuccess, onError) {
    try {
        let requestAnswer = await this.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/auth/login", loginData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            this.#saveToken(requestAnswer);
            this.setLoggedIn(true);
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

  reset() {
    AuthManager.#instance = null;
    AuthManager.#instance = new AuthManager();
  }

  async logout() {
    try {
      await this.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/auth/logout");
      this.setLoggedIn(false);
  } catch (error) {
      console.error("Error logging out user: ", error);
  }
  }

  #saveToken(requestAnswer) {
    // this.#axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + requestAnswer.data.token;
    // sessionStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_token);
    // sessionStorage.setItem("jwtReceptionMillis", Date.now().toString());
  }

  async register(registerData, onSuccess, onError) {
    try {
        let requestAnswer = await this.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/auth/register", registerData);
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
