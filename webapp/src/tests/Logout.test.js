import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {logoutUser} from "components/game/Logout";

const mockAxios = new MockAdapter(axios);

describe("Logout User tests", () => {
    beforeEach(() => {
        sessionStorage.clear();
        mockAxios.reset();
    });

    it("successfully logs out the user", async () => {
        mockAxios.onGet("http://98.66.168.12:8080/auth/logout" + "/auth/logout").replyOnce(200);

        sessionStorage.setItem("jwtToken", "token");
        sessionStorage.setItem("jwtRefreshToken", "refreshToken");

        await logoutUser();

        expect(sessionStorage.getItem("jwtToken")).toBeNull();
        expect(sessionStorage.getItem("jwtRefreshToken")).toBeNull();
    });
});