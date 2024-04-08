import MockAdapter from "axios-mock-adapter";
import { newGame, startRound, getCurrentQuestion, changeLanguage, answerQuestion, getGameDetails } from "components/game/Game";
import axios, { HttpStatusCode } from "axios";
import AuthManager from "components/auth/AuthManager";

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

describe("Game Service tests", () => {
    beforeEach(() => {
        authManager.reset();
        mockAxios = new MockAdapter(authManager.getAxiosInstance());
    });

    describe("newGame function", () => {
        it("successfully creates a new game", async () => {
            const mockResponse = { gameId: 123, status: "created" };

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + "/games/new").replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await newGame();

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when creating a new game", async () => {
            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + "/games/new").replyOnce(
                HttpStatusCode.InternalServerError
            );

            const result = await newGame();

            expect(result).toBeUndefined();
        });
    });

    describe("startRound function", () => {
        it("successfully starts a new round", async () => {
            const gameId = 123;
            const mockResponse = { roundId: 456, status: "started" };

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/startRound`).replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await startRound(gameId);

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when starting a new round", async () => {
            const gameId = 123;

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/startRound`).replyOnce(
                HttpStatusCode.NotFound
            );

            const result = await startRound(gameId);

            expect(result).toBeUndefined();
        });
    });
    describe("getCurrentQuestion function", () => {
        it("successfully retrieves current question", async () => {
            const gameId = 123;
            const mockResponse = { questionId: 456, text: "What's your name?" };

            mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/question`).replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await getCurrentQuestion(gameId);

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when retrieving current question", async () => {
            const gameId = 123;

            mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/question`).replyOnce(
                HttpStatusCode.NotFound
            );

            const result = await getCurrentQuestion(gameId);

            expect(result).toBeUndefined();
        });
    });

    describe("changeLanguage function", () => {
        it("successfully changes language", async () => {
            const gameId = 123;
            const language = "en";
            const mockResponse = { success: true, message: "Language changed successfully." };

            mockAxios.onPut(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/language?language=${language}`).replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await changeLanguage(gameId, language);

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when changing language", async () => {
            const gameId = 123;
            const language = "en";

            mockAxios.onPut(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/language?language=${language}`).replyOnce(
                HttpStatusCode.BadRequest
            );

            const result = await changeLanguage(gameId, language);

            expect(result).toBeUndefined();
        });
    });

    describe("answerQuestion function", () => {
        it("successfully submits an answer", async () => {
            const gameId = 123;
            const answerId = "a1";
            const mockResponse = { success: true, message: "Answer submitted successfully." };

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/answer`, { answer_id: answerId }).replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await answerQuestion(gameId, answerId);

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when submitting an answer", async () => {
            const gameId = 123;
            const answerId = "a1";

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/answer`, { answer_id: answerId }).replyOnce(
                HttpStatusCode.InternalServerError
            );

            const result = await answerQuestion(gameId, answerId);

            expect(result).toBeUndefined();
        });
    });

    describe("getGameDetails function", () => {
        it("successfully retrieves game details", async () => {
            const gameId = 123;
            const mockResponse = { gameId: 123, status: "started" };

            mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/details`).replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await getGameDetails(gameId);

            expect(result).toEqual(mockResponse);
        });

        it("handles errors when retrieving game details", async () => {
            const gameId = 123;

            mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + `/games/${gameId}/details`).replyOnce(
                HttpStatusCode.NotFound
            );

            const result = await getGameDetails(gameId);

            expect(result).toBeUndefined();
        });
    });
});
