import { ChakraProvider } from "@chakra-ui/react";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router";
import theme from "../styles/theme";
import UserStatistics from "components/statistics/UserStatistics";
import AuthManager from "components/auth/AuthManager";
import MockAdapter from "axios-mock-adapter";
import { HttpStatusCode } from "axios";
import each from "jest-each";

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

describe("UserStatistics", () => {

    test("the spinner is rendered when waiting for the data", () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><UserStatistics /></MemoryRouter></ChakraProvider>);
        expect(screen.getByTestId("user-statistics-spinner")).toBeEnabled();
    });

    test("the component is rendered correctly", () => {
        render(<ChakraProvider theme={theme}><MemoryRouter><UserStatistics /></MemoryRouter></ChakraProvider>);
        expect(screen.getByTestId("user-statistics")).toBeEnabled();
    });

    describe("a petition is made requesting the user's data", () => {
        const authManager = new AuthManager();
        let mockAxios;
    
        beforeEach(() => {
          authManager.reset();
          mockAxios = new MockAdapter(authManager.getAxiosInstance());
        });
    
        afterAll(() => {
          mockAxios = null;
          authManager.reset();
        });

        test("the data arrives successfully", () => {
            const data = {
                "right": 5,
                "wrong": 5,
                "rate": 50
            };

            mockAxios.onGet().reply(HttpStatusCode.Ok, data);
            render(<ChakraProvider theme={theme}><MemoryRouter><UserStatistics /></MemoryRouter></ChakraProvider>);

            waitFor(() => {
                expect(mockAxios.history.get.length).toBe(1);
                expect(screen.getByTestId("chart")).toBeEnabled();
            });
        })

        describe("the request fails", () => {
            each([HttpStatusCode.BadGateway, HttpStatusCode.NotFound, 
                HttpStatusCode.ImATeapot]).test("with status code %d", (statusCode) => {
                    authManager.reset();
                    mockAxios = new MockAdapter(authManager.getAxiosInstance());
                
                    mockAxios.onGet().reply(statusCode);

                    waitFor(() => {
                        expect(mockAxios.history.get.length).toBe(1);
                        expect(screen.getByTestId("error-message")).toBeVisible();
                    });
                });
        })
    });
    
});
