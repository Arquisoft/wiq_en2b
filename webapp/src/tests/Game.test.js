import React from 'react';
import {render, fireEvent, screen, act, waitFor} from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Game from '../pages/Game';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import AuthManager from "../components/auth/AuthManager";
import MockAdapter from "axios-mock-adapter";
import {HttpStatusCode} from "axios";

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
        language: "en"
      },
    }
  },
}));

const authManager = new AuthManager();
let mockAxios = new MockAdapter(authManager.getAxiosInstance());
const api = process.env.REACT_APP_API_ENDPOINT;

const game = {
  "id": 23483743,
  "user": {
    "id": 1,
    "username": "Hordi Jurtado",
    "email": "chipiChipi@chapaChapa.es "
  },
  "rounds": 9,
  "gamemode": "KIWI_QUEST",
  "gameOver": false,
  "actual_round": 0,
  "correctly_answered_questions": 0,
  "round_start_time": new Date(),
  "round_duration": 20
};
const round = {
  "id": 23483743,
  "user": {
    "id": 1,
    "username": "Hordi Jurtado",
    "email": "chipiChipi@chapaChapa.es "
  },
  "rounds": 9,
  "gamemode": "KIWI_QUEST",
  "gameOver": false,
  "actual_round": 1,
  "correctly_answered_questions": 0,
  "round_start_time": new Date(),
  "round_duration": 20
};
const question = {
  "id": 1,
  "content": "What is the capital of France?",
  "answers": [
    {
      "id": 1,
      "text": "Paris",
      "category": "CITY"
    },
    {
      "id": 2,
      "text": "London",
      "category": "CITY"
    },
    {
      "id": 3,
      "text": "Berlin",
      "category": "CITY"
    },
    {
      "id": 4,
      "text": "Madrid",
      "category": "CITY"
    }
  ],
  "questionCategory": "GEOGRAPHY",
  "answerCategory": "CITY",
  "language": "en",
  "type": "MULTIPLE_CHOICE",
  "image": "https://www.example.com/image.jpg"
}

describe('Game component', () => {

  describe("there is no prior game", () => {

    beforeEach(() => {
      mockAxios.onGet(`${api}/games/play`).reply(HttpStatusCode.Ok, game);
      mockAxios.onGet(`${api}/games/${game.id}/question`).replyOnce(HttpStatusCode.Conflict);
      mockAxios.onPost(`${api}/games/${game.id}/startRound`).reply(HttpStatusCode.Ok, round);
      mockAxios.onGet(`${api}/games/${game.id}/question`).reply(HttpStatusCode.Ok, question);
    });

    afterEach(() => {
      authManager.reset();
      mockAxios = new MockAdapter(authManager.getAxiosInstance());
    });

    it("renders correctly", async () => {
      const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);

      await waitFor(() => {
        expect(container.querySelectorAll(".question-answer").length).toBe(4);
        expect(container.querySelector("#question").textContent).toBe(question.content);
        expect(mockAxios.history.get.length).toBe(3);
        expect(mockAxios.history.post.length).toBe(1);
      });
    });

    test('disables next button when no option is selected', async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      const nextButton = await screen.findByTestId('Next');

      expect(nextButton).toBeDisabled();
    });

    test('enables next button when an option is selected', async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      const option1Button = await screen.findByTestId('Option1');
      const nextButton = await screen.findByTestId('Next');

      await act(() => fireEvent.click(option1Button));

      expect(nextButton).toBeEnabled();
    });

    test("only the last selection is chosen", async () => {
      mockAxios.onPost(`${api}/games/${game.id}/answer`).replyOnce(HttpStatusCode.Ok, {
        was_correct: true
      });

      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      await screen.findByTestId('Option1');

      await act(() => fireEvent.click(screen.getByTestId('Option1')));
      await act(() => fireEvent.click(screen.getByTestId('Option3')));
      await act(() => fireEvent.click(screen.getByTestId('Next')));

      await waitFor(() => {
        expect(mockAxios.history.post[1].data).toBe(JSON.stringify({"answer_id": question.answers[2].id}));
      })
    });

    test("after answering with an answer that is true, confetti is shown", async () => {
      mockAxios.onPost(`${api}/games/${game.id}/answer`).replyOnce(HttpStatusCode.Ok, {
        was_correct: true
      });

      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      await screen.findByTestId('Option1');

      await act(() => fireEvent.click(screen.getByTestId('Option1')));
      await act(() => fireEvent.click(screen.getByTestId('Next')));

      await waitFor(() => {
        expect(screen.getByTestId("confetti")).toBeEnabled();
      });
    });
  });

  describe("there is a prior game", () => {

    beforeEach(() => {
      mockAxios.onGet(`${api}/games/play`).reply(HttpStatusCode.Ok, game);
      mockAxios.onGet(`${api}/games/${game.id}/question`).reply(HttpStatusCode.Ok, question);
      mockAxios.onPost(`${api}/games/${game.id}/startRound`).reply(HttpStatusCode.Ok, round);
    });

    afterEach(() => {
      authManager.reset();
      mockAxios = new MockAdapter(authManager.getAxiosInstance());
    });

    it("renders correctly", async () => {
      const { container } = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);

      await waitFor(() => {
        expect(container.querySelectorAll(".question-answer").length).toBe(4);
        expect(container.querySelector("#question").textContent).toBe(question.content);
        expect(mockAxios.history.get.length).toBe(2);
        expect(mockAxios.history.post.length).toBe(0);
      });
    });

    test('disables next button when no option is selected', async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      const nextButton = await screen.findByTestId('Next');

      expect(nextButton).toBeDisabled();
    });

    test('enables next button when an option is selected', async () => {
      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      const option1Button = await screen.findByTestId('Option1');
      const nextButton = await screen.findByTestId('Next');

      await act(() => fireEvent.click(option1Button));

      expect(nextButton).toBeEnabled();
    });

    test("only the last selection is chosen", async () => {
      mockAxios.onPost(`${api}/games/${game.id}/answer`).replyOnce(HttpStatusCode.Ok, {
        was_correct: true
      });

      render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      await screen.findByTestId('Option1');

      await act(() => fireEvent.click(screen.getByTestId('Option1')));
      await act(() => fireEvent.click(screen.getByTestId('Option3')));
      await act(() => fireEvent.click(screen.getByTestId('Next')));

      await waitFor(() => {
        expect(mockAxios.history.post[0].data).toBe(JSON.stringify({"answer_id": question.answers[2].id}));
      })
    });

    test("there is no confetti if the answer is wrong", async () => {
      mockAxios.onPost(`${api}/games/${game.id}/answer`).replyOnce(HttpStatusCode.Ok, {
        was_correct: false
      });

      const {container} = render(<ChakraProvider theme={theme}><MemoryRouter><Game/></MemoryRouter></ChakraProvider>);
      await screen.findByTestId('Option1');

      await act(() => fireEvent.click(screen.getByTestId('Option1')));
      await act(() => fireEvent.click(screen.getByTestId('Next')));

      await waitFor(() => {
        expect(container.querySelectorAll("[data-testid='confetti']").length).toBe(0);
      });
    });
  });
});
