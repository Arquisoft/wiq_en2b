import MockAdapter from "axios-mock-adapter";
import axios, { HttpStatusCode } from "axios";
import { isUserLogged, login } from "components/auth/AuthUtils";

const mockAxios = new MockAdapter(axios);

describe("Auth Utils tests", () => {
    describe("when the user is not authenticated", () => {

        beforeEach(() => {
            mockAxios.reset();
        });

        it("does not have a stored token", () => {
            expect(isUserLogged()).not.toBe(true);
        });

        it("when logging in it is possible to do it", async () => {

            // Mock response
            mockAxios.onPost().replyOnce(HttpStatusCode.Ok, {
                "token": "token",
                "refresh_Token": "refreshToken"
            });

            // Test
            const loginData = {
                "email": "test@email.com",
                "password": "test"
            };

            await login(loginData);

            //Check the user is now logged in
            expect(isUserLogged()).toBe(true);
            expect(localStorage.getItem("jwtToken")).toBe("token");
            expect(localStorage.getItem("jwtRefreshToken")).toBe("refreshToken");
        });
    });

    describe("when the user is authenticated", () => {

        beforeAll(() => {
            localStorage.setItem("jwtToken", "token");
        })

        it("has a stored token", () => {
            expect(isUserLogged()).toBe(true);
        });
    });
});


