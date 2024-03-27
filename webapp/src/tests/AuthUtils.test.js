import MockAdapter from "axios-mock-adapter";
import axios, { HttpStatusCode } from "axios";
import {isUserLogged, login, register, saveToken} from "components/auth/AuthUtils";

const mockAxios = new MockAdapter(axios);

describe("Auth Utils tests", () => {
    describe("when the user is not authenticated", () => {

        beforeEach(() => {
            sessionStorage.clear();
            mockAxios.reset();
        });

        it("does not have a stored token", () => {
            expect(isUserLogged()).toBe(false);
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

            await login(loginData, mockOnSucess, mockOnError);

            expect(mockOnSucess).toHaveBeenCalled();
            expect(mockOnError).not.toHaveBeenCalled();
            expect(isUserLogged()).toBe(true);
        });

        it("handles login error with 400 status code", async () => {
            mockAxios.onPost().replyOnce(HttpStatusCode.BadRequest);

            const mockOnSuccess = jest.fn();
            const mockOnError = jest.fn();

            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData, mockOnSuccess, mockOnError, jest.fn());

            expect(mockOnSuccess).not.toHaveBeenCalled();
            expect(mockOnError).toHaveBeenCalled();
            expect(isUserLogged()).toBe(false);
        });

        it("handles login error with 401 status code", async () => {
            mockAxios.onPost().replyOnce(HttpStatusCode.Unauthorized);

            const mockOnSuccess = jest.fn();
            const mockOnError = jest.fn();

            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData, mockOnSuccess, mockOnError, jest.fn());

            expect(mockOnSuccess).not.toHaveBeenCalled();
            expect(mockOnError).toHaveBeenCalled();
            expect(isUserLogged()).toBe(false);
        });
        it("handles login error with other status code", async () => {
            mockAxios.onPost().replyOnce(HttpStatusCode.InternalServerError);

            const mockOnSuccess = jest.fn();
            const mockOnError = jest.fn();

            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData, mockOnSuccess, mockOnError, jest.fn());

            expect(mockOnSuccess).not.toHaveBeenCalled();
            expect(mockOnError).toHaveBeenCalled();
            expect(isUserLogged()).toBe(false);
        });
    });

    describe("when the user is authenticated", () => {

        beforeAll(() => {
            sessionStorage.setItem("jwtToken", "token");
        });

        afterEach(() => {
            sessionStorage.clear();
        });

        it("has a stored token", () => {
            expect(isUserLogged()).toBe(true);
        });

        it("can log out successfully", () => {
            sessionStorage.clear();
            expect(isUserLogged()).toBe(false);
        });
    });

    describe("saving the token", () => {
        beforeEach(() => {
            sessionStorage.clear();
        });

        it("saves the token and refresh token", () => {
            let mockResponse = {
                "data": {
                    "token": "token",
                    "refresh_token": "refreshToken"
                }
            };
            saveToken(mockResponse);
            expect(sessionStorage.getItem("jwtToken")).toBe(mockResponse.data.token);
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe(mockResponse.data.refresh_token);
        });
    });

    describe("register", () => {
        beforeEach(() => {
            sessionStorage.clear();
            mockAxios.reset();
        });

        it("handles successful registration", async () => {
            const registerData = {
                "email": "test@email.com",
                "password": "test"
            };

            const onSuccess = jest.fn();
            const onError = jest.fn();

            mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
                "token": "token",
                "refresh_token": "refreshToken"
            });

            await register(registerData, onSuccess, onError, jest.fn());

            expect(onSuccess).toHaveBeenCalled();
            expect(onError).not.toHaveBeenCalled();
            expect(sessionStorage.getItem("jwtToken")).toBe("token");
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe("refreshToken");
        });

        it("handles registration error with status code 400", async () => {
            const registerData = {
                "email": "test@email.com",
                "password": "test"
            };

            const onSuccess = jest.fn();
            const onError = jest.fn();

            mockAxios.onPost().replyOnce(HttpStatusCode.BadRequest);

            await register(registerData, onSuccess, onError, jest.fn());

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(sessionStorage.getItem("jwtToken")).toBe(null);
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe(null);
        });

        it("handles registration error with status code 409", async () => {
            const registerData = {
                "email": "test@email.com",
                "password": "test"
            };

            const onSuccess = jest.fn();
            const onError = jest.fn();

            mockAxios.onPost().replyOnce(HttpStatusCode.Conflict);

            await register(registerData, onSuccess, onError, jest.fn());

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(sessionStorage.getItem("jwtToken")).toBe(null);
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe(null);
        });

        it("handles registration error with unknown status code", async () => {
            const registerData = {
                "email": "test@email.com",
                "password": "test"
            };

            const onSuccess = jest.fn();
            const onError = jest.fn();

            mockAxios.onPost().replyOnce(HttpStatusCode.InternalServerError);

            await register(registerData, onSuccess, onError, jest.fn());

            expect(onSuccess).not.toHaveBeenCalled();
            expect(onError).toHaveBeenCalled();
            expect(sessionStorage.getItem("jwtToken")).toBe(null);
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe(null);
        });
    });
});



