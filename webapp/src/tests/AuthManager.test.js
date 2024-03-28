import MockAdapter from "axios-mock-adapter";
import AuthManager from "../components/auth/AuthManager";
import { HttpStatusCode } from "axios";

const authManager = new AuthManager();
let mockAxios;

describe("AuthManager", () => {

  beforeEach(() => {
    authManager.reset();
    mockAxios = new MockAdapter(authManager.getAxiosInstance());
  });

  it("can log in successfully", async () => {
    mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
      "token": "token",
      "refresh_Token": "refreshToken"
    });
    const mockOnSucess = jest.fn();
    const mockOnError = jest.fn();

    const loginData = {
        "email": "test@email.com",
        "password": "test"
    };

    await authManager.login(loginData, mockOnSucess, mockOnError);

    expect(mockOnSucess).toHaveBeenCalled();
    expect(mockOnError).not.toHaveBeenCalled();
    expect(authManager.isLoggedIn()).toBe(true);

  });

  it("can log out correctly", async () => {
    mockAxios.onGet().replyOnce(HttpStatusCode.Ok);
    authManager.setLoggedIn(true);
    await authManager.logout();
    expect(authManager.isLoggedIn()).toBe(false);
  });
});
