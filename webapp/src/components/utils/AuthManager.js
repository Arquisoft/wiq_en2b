import axios from "axios";

class AuthManager {
  static instance = null;
  loggedIn = false;
  axiosInstance = null;

  constructor() {
    if (!AuthManager.instance) {
      this.axiosInstance = axios.create();
      AuthManager.instance = this;
    }
    return AuthManager.instance;
  }

  setLoggedIn(value) {
    this.loggedIn = value;
    if (value) {
      this.axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("accessToken")}`;
    } else {
      delete this.axiosInstance.defaults.headers.common["Authorization"];
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getAxiosInstance() {
    return this.axiosInstance;
  }
}

export default AuthManager;
