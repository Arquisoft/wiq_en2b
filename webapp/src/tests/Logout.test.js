import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {logoutUser} from "components/game/Logout";

const mockAxios = new MockAdapter(axios);

jest.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (str) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      }
    },
  }));

describe("Logout User tests", () => {
    beforeEach(() => {
        sessionStorage.clear();
        mockAxios.reset();
    });

    it("successfully logs out the user", async () => {
        mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + "/auth/logout").replyOnce(200);

        sessionStorage.setItem("jwtToken", "token");
        sessionStorage.setItem("jwtRefreshToken", "refreshToken");

        await logoutUser();

        expect(sessionStorage.getItem("jwtToken")).toBeNull();
        expect(sessionStorage.getItem("jwtRefreshToken")).toBeNull();
    });
});