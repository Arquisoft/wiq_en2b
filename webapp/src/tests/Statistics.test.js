import { ChakraProvider } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import Statistics from "pages/Statistics";
import React from "react";
import { MemoryRouter } from "react-router";
import theme from "styles/theme";

describe("Statistics", () => {

  beforeAll(() => {
    global.ResizeObserver = jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    }))
  });

  test("the page is rendered correctly", () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Statistics /></MemoryRouter></ChakraProvider>);
    expect(screen.getByTestId("leaderboard-component")).toBeEnabled();
    expect(getByText("common.statistics.title"));
  })
});
