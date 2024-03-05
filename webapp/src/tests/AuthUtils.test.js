import MockAdapter from "axios-mock-adapter";
import axios, { HttpStatusCode } from "axios";
import { isUserLogged, login} from "components/auth/AuthUtils";

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
            expect(sessionStorage.getItem("jwtToken")).toBe("token");
            expect(sessionStorage.getItem("jwtRefreshToken")).toBe("refreshToken");
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
});


