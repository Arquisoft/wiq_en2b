import MockAdapter from "axios-mock-adapter";
import axios, { HttpStatusCode } from "axios";
import {isUserLogged, login, saveToken} from "components/auth/AuthUtils";

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

        it("handles login error", async () => {
            mockAxios.onPost().replyOnce(HttpStatusCode.BadRequest);

            const mockOnSucess = jest.fn();
            const mockOnError = jest.fn();

            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData, mockOnSucess, mockOnError, jest.fn()); // Passing jest.fn() as a placeholder for `t`

            expect(mockOnSucess).not.toHaveBeenCalled();
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
});



