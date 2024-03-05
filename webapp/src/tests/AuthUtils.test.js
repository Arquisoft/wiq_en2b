import MockAdapter from "axios-mock-adapter";
import axios, { HttpStatusCode } from "axios";
import {isUserLogged, login, saveToken} from "components/auth/AuthUtils";

const mockAxios = new MockAdapter(axios);

describe("Auth Utils tests", () => {
    describe("when the user is not authenticated", () => {

        beforeEach(() => {
            mockAxios.reset();
        });

        it("does not have a stored token", () => {
            expect(isUserLogged()).not.toBe(true);
        });

        it("can log in", async () => {

            // Mock axios and the onSuccess and onError functions
            mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
                "token": "token",
                "refresh_Token": "refreshToken"
            });
            const mockOnSucess = jest.fn();
            const mockOnError = jest.fn();

            // Test
            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData, mockOnSucess, mockOnError);

            //Check the user is now logged in
            expect(isUserLogged()).toBe(true);
        });
    });

    describe("when the user is authenticated", () => {

        beforeAll(() => {
            sessionStorage.setItem("authData", {
                "token": "testToken"
            });
        })

        it("has a stored token", () => {
            expect(isUserLogged()).toBe(true);
        });
    });

    describe("saving the token", () => {
        beforeAll(() => {
            sessionStorage.clear();
        });

        it ("is saved", () => {
            let mockResponse = {
                "data": {
                    "token": "token",
                    "refresh_Token": "refreshToken"
                }
            };
            saveToken(mockResponse);
            expect(sessionStorage.getItem("jwtToken")).toBe(mockResponse.data.token);
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe(mockResponse.data.refresh_Token);
        });
    });
});


