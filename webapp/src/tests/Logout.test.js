import MockAdapter from "axios-mock-adapter";
import AuthManager from "components/auth/AuthManager";
import Logout from "../pages/Logout";
import { MemoryRouter } from "react-router";
import { render, waitFor } from "@testing-library/react";
import React from "react";

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

const authManager = new AuthManager();
let mockAxios;
describe("Logout User tests", () => {
    beforeEach(() => {
        authManager.reset();
        mockAxios = new MockAdapter(authManager.getAxiosInstance());
    });

    it("successfully logs out the user", async () => {
        mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + "/auth/logout").replyOnce(200);

        authManager.setLoggedIn(true);

        render(<Logout/>, {wrapper: MemoryRouter});

        waitFor(() => {
          expect(mockAxios.history.get.length).toBe(1);
          expect(authManager.isLoggedIn()).toBe(false);
        })
    });
});