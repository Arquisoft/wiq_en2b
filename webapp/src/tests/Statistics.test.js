import { ChakraProvider } from "@chakra-ui/react";
import { getByTestId, getByText, render, screen, waitFor } from "@testing-library/react";
import Statistics from "pages/Statistics";
import React from "react";
import { MemoryRouter } from "react-router";
import theme from "../styles/theme";
import MockAdapter from "axios-mock-adapter";
import AuthManager from "components/auth/AuthManager";
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

describe("Statistics", () => {

  test("the page is rendered correctly", () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);
    expect(screen.getByTestId("leaderboard-component")).toBeEnabled();
    expect(getByText("common.statistics.title")).toBeVisible();
    expect(screen.getByTestId("background")).toBeVisible();
  });

  test("the leaderboard spinner is rendered when loading the data", () => {
    render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);
    expect(screen.getByTestId("leaderboard-spinner")).toBeEnabled();
  });

  describe("a petition is made requesting the top ten", () => {
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
    });

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
          "username": "maria",
          "correct": 4,
          "wrong": 8,
          "total": 12,
          "rate": 33.33
        },
        {
          "username": "charlie",
          "correct": 8,
          "wrong": 2,
          "total": 10,
          "rate": 80
        }
      ];
      mockAxios.onGet().replyOnce(HttpStatusCode.Ok, data);
      const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);

      waitFor(() => {
        expect(screen.getByTestId("top-ten")).toBeEnabled();
        expect(Array.from(container.querySelectorAll("tbody tr")).length).toBe(data.length);
        data.forEach((element, counter) => {
          expect(container.querySelector(`tbody tr:nth-child(${counter}) th`).innerHTML).toBe(counter + 1)
          expect(container.querySelector(`tbody tr:nth-child(${counter}) td:nth-child(0)`).innerHTML).toBe(element.username);
          expect(container.querySelector(`tbody tr:nth-child(${counter}) td:nth-child(1)`).innerHTML).toBe(element.correct);
          expect(container.querySelector(`tbody tr:nth-child(${counter}) td:nth-child(2)`).innerHTML).toBe(element.wrong);
          expect(container.querySelector(`tbody tr:nth-child(${counter}) td:nth-child(3)`).innerHTML).toBe(element.total);
          expect(container.querySelector(`tbody tr:nth-child(${counter}) td:nth-child(4)`).innerHTML).toBe(element.rate);
        })
      })
    });

    test("no data is returned", () => {
      const data = [];
      mockAxios.onGet().replyOnce(HttpStatusCode.Ok, data);
      const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);

      waitFor(() => {
        expect(screen.getByTestId("top-ten")).not.toBeEnabled();
        expect(getByText("statistics.empty")).toBeEnabled();
      });
    })

    describe("the petition fails", () => {
      each([HttpStatusCode.BadRequest, HttpStatusCode.NotFound, 
        HttpStatusCode.InternalServerError]).test("with status code %d", statusCode => {
          authManager.reset();
          mockAxios = new MockAdapter(authManager.getAxiosInstance());
          mockAxios.onGet().replyOnce(statusCode);
          render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);

          waitFor(() => {
            expect(mockAxios.history.get.length).toBe(1);
            expect(screen.getByTestId("error-message")).toBeVisible();
          });
        });
    })
  })
});
