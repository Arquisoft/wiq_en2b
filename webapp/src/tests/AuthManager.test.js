import MockAdapter from "axios-mock-adapter";
import AuthManager from "../components/auth/AuthManager";
import { HttpStatusCode } from "axios";
import { waitFor } from "@testing-library/react";
import each from "jest-each";

const authManager = new AuthManager();
let mockAxios;

describe("AuthManager", () => {

  describe("the user has not logged in", () => {
    beforeEach(() => {
      authManager.reset();
      mockAxios = new MockAdapter(authManager.getAxiosInstance());
      localStorage.clear();
    });
  
    it("is possible to log in successfully", async () => {
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
      expect(localStorage.length).toBe(1);
      waitFor(() => expect(authManager.isLoggedIn()).toBe(true));
    });

    test("the user can register successfully", async () => {
      mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
        "token": "token",
        "refresh_Token": "refreshToken"
      });
      const mockOnSucess = jest.fn();
      const mockOnError = jest.fn();
  
      const registerData = {
          "email": "test@email.com",
          "username": "usernameTest",
          "password": "test"
      };
  
      await authManager.register(registerData, mockOnSucess, mockOnError);
  
      expect(mockOnSucess).toHaveBeenCalled();
      expect(mockOnError).not.toHaveBeenCalled();
      expect(localStorage.length).toBe(1);
      waitFor(() => expect(authManager.isLoggedIn()).toBe(true));
    });

    describe("the onError function is called if the login fails ",  () => {
      each([HttpStatusCode.InternalServerError, 
        HttpStatusCode.BadGateway, HttpStatusCode.Conflict]).test("with status code %d", async (statusCode) => {
          mockAxios.onPost().replyOnce(statusCode);
          const mockOnSucess = jest.fn();
          const mockOnError = jest.fn();
      
          const loginData = {
              "email": "test@email.com",
              "password": "test"
          };
      
          await authManager.login(loginData, mockOnSucess, mockOnError);
      
          expect(mockOnError).toHaveBeenCalled();
          expect(mockOnSucess).not.toHaveBeenCalled();
          expect(localStorage.length).toBe(0);
          waitFor(() => expect(authManager.isLoggedIn()).toBe(false));
        });
    });

    describe("the onError function is called if the signup fails ",  () => {
      each([HttpStatusCode.InternalServerError, 
        HttpStatusCode.BadGateway, HttpStatusCode.Conflict]).test("with status code %d", async (statusCode) => {
          mockAxios.onPost().replyOnce(statusCode);
          const mockOnSucess = jest.fn();
          const mockOnError = jest.fn();
      
          const registerData = {
              "username": "user",
              "email": "test@email.com",
              "password": "test"
          };
      
          await authManager.register(registerData, mockOnSucess, mockOnError);
      
          expect(mockOnError).toHaveBeenCalled();
          expect(mockOnSucess).not.toHaveBeenCalled();
          expect(localStorage.length).toBe(0);
          waitFor(() => expect(authManager.isLoggedIn()).toBe(false));
        });
    });
  });

  describe("the user has logged in", () => {

    beforeEach(() => {
      authManager.reset();
      mockAxios = new MockAdapter(authManager.getAxiosInstance());
      localStorage.clear();
      authManager.setLoggedIn(true);
    });

    it("is possible to log out correctly", async () => {
      mockAxios.onGet().replyOnce(HttpStatusCode.Ok);
      authManager.setLoggedIn(true);
      await authManager.logout();
      waitFor(() => expect(authManager.isLoggedIn()).toBe(false));
    });

    test("the session has expired and is renewed when checking if the user is logged", () => {
      localStorage.setItem("jwtRefreshToken", "oldRefreshToken");
      mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
        "token": "token",
        "refresh_Token": "newRefreshToken"
      });

      waitFor(() => {
        expect(authManager.isLoggedIn()).toBe(true);
        expect(mockAxios.history.post.length).toBe(1);
        expect(mockAxios.history.post[0].data).toBe({
          "refresh_token": "oldRefreshToken"
        });
        expect(localStorage.getItem("jwtRefreshToken")).toBe("newRefreshToken");
      });
    });

    test("the user can log out", () => {
      mockAxios.onGet().replyOnce(HttpStatusCode.Ok);
      authManager.logout();

      waitFor(() => {expect(authManager.isLoggedIn()).toBe(false);});
      expect(mockAxios.history.get.length).toBe(1);
      expect(localStorage.length).toBe(0);
    });

  });
});