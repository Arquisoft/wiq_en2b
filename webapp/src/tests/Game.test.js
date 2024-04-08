import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { MemoryRouter } from 'react-router';
import Game from "../pages/Game"; 
import { HttpStatusCode } from "axios";
import AuthManager from "components/auth/AuthManager";
import MockAdapter from "axios-mock-adapter";

describe("Game Component", () => {
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

  it("renders loading spinner initially", () => {
    const { getByTestId } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    expect(getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders round number and correct answers count", async () => {
    const { getByText } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    expect(getByText("game.round1")).toBeInTheDocument();
    expect(getByText("Correct answers: 0")).toBeInTheDocument();
  });

  it("displays question and options after loading", async () => {
    const data = {
      question: "What is the capital of Spain?",
      options: ["Madrid", "Barcelona", "Seville", "Valencia"],
    };
    mockAxios.onGet().reply(HttpStatusCode.Ok, data);
    const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    waitFor(() => {
      expect(container).toHaveTextContent("What is the capital of Spain?");
      expect(container).toHaveTextContent("Madrid");
      expect(container).toHaveTextContent("Barcelona");
      expect(container).toHaveTextContent("Seville");
      expect(container).toHaveTextContent("Valencia");
    });
  });

  it("allows selecting an answer and enables next button", async () => {
    const data = {
      question: "What is the capital of Spain?",
      options: ["Madrid", "Barcelona", "Seville", "Valencia"],
    };
    mockAxios.onGet().reply(HttpStatusCode.Ok, data);
    const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
    waitFor(() => {
      const optionButton = container.querySelector("button");
      fireEvent.click(optionButton);
      expect(optionButton).toHaveStyle("background-color: green");
      const nextButton = container.querySelector("button");
      expect(nextButton).not.toBeDisabled();
    });
  });
});
