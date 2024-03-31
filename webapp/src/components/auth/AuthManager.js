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

  async isLoggedIn() {

    if (!AuthManager.#instance.#isLoggedIn) {
      if (sessionStorage.getItem("jwtRefreshToken")) {
        await this.#refresh();
      }
    }
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
            AuthManager.#instance.setLoggedIn(true);
            onSuccess();
        } else {
            throw requestAnswer;
        }
    } catch (error) {
        onError(error);
    }
  }

  reset() {
    AuthManager.#instance = null;
    AuthManager.#instance = new AuthManager();
  }

  async logout() {
    try {
      await this.getAxiosInstance().get(process.env.REACT_APP_API_ENDPOINT + "/auth/logout");
      AuthManager.#instance.setLoggedIn(false);
      this.getAxiosInstance().defaults.headers.common["authorization"] = undefined;
      sessionStorage.removeItem("jwtRefreshToken");
    } catch (error) {
        console.error("Error logging out user: ", error);
    }
  }

  #saveToken(requestAnswer) {
    this.getAxiosInstance().defaults.headers.common["authorization"] = "Bearer " + requestAnswer.data.token;;
    sessionStorage.setItem("jwtRefreshToken", requestAnswer.data.refresh_token);
  }

  async #refresh() {
    try {
        let response = await this.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/auth/refresh-token", {
          "refresh_token": sessionStorage.getItem("jwtRefreshToken")
        });
        this.#saveToken(response);
        AuthManager.#instance.setLoggedIn(true);
    } catch (error) {
        console.error("Error refreshing token: ", error);
    }  
  }

  async register(registerData, onSuccess, onError) {
    try {
        let requestAnswer = await this.getAxiosInstance().post(process.env.REACT_APP_API_ENDPOINT + "/auth/register", registerData);
        if (HttpStatusCode.Ok === requestAnswer.status) {
            this.#saveToken(requestAnswer);
            AuthManager.#instance.setLoggedIn(true);
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
