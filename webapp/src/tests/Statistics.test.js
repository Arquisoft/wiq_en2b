import { ChakraProvider } from "@chakra-ui/react";
import { getByTestId, render, screen, waitFor } from "@testing-library/react";
import Statistics from "pages/Statistics";
import React from "react";
import { MemoryRouter } from "react-router";
import theme from "../styles/theme";
import MockAdapter from "axios-mock-adapter";
import AuthManager from "components/auth/AuthManager";
import { HttpStatusCode } from "axios";


describe("Statistics", () => {

  test("the page is rendered correctly", () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);
    expect(screen.getByTestId("leaderboard-component")).toBeEnabled();
    expect(getByText("common.statistics.title"));
  });

  test("the leaderboard spinner is rendered when loading the data", () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);
    expect(screen.getByTestId("leaderboard-spinner")).toBeEnabled();
  });

  describe("the data is to be loaded", () => {

    const authManager = new AuthManager();
    jest.doMock("../components/statistics/UserStatistics", () => {
      return () => <div></div>
    });
    let mockAxios;

    beforeEach(() => {
      mockAxios = new MockAdapter(authManager.getAxiosInstance());
    });

    afterAll(() => {
      mockAxios = null;
      authManager.reset();
    })

    test("the data is returned correctly", () => {
      const data = [
        {
          "username": "pepe",
          "correct": 2,
          "wrong": 5,
          "total": 7,
          "rate": 28.57
        },
        {
          "username": "pepe",
          "correct": 2,
          "wrong": 5,
          "total": 7,
          "rate": 28.57
        },
        {
          "username": "pepe",
          "correct": 2,
          "wrong": 5,
          "total": 7,
          "rate": 28.57
        }
      ];
      mockAxios.onGet().replyOnce(HttpStatusCode.Ok, data);
      const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);

      waitFor(() => {
        expect(screen.getByTestId("top-ten")).toBeEnabled();
        expect(Array.from(container.querySelectorAll("tbody tr")).length).toBe(data.length)
      })
    })
  })
});
