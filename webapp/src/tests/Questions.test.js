import MockAdapter from "axios-mock-adapter";
import { getQuestion, answerQuestion } from "components/game/Questions";
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
  })
);

const authManager = new AuthManager();
let mockAxios;

describe("Question Service tests", () => {
    describe("getQuestion function", () => {
        beforeEach(() => {
            authManager.reset();
            mockAxios = new MockAdapter(authManager.getAxiosInstance());
        });

        it("successfully retrieves a question", async () => {
            // Mock axios
            const mockQuestion = {
                questionId: 123,
                text: "What is the meaning of life?",
            };

            mockAxios.onGet(process.env.REACT_APP_API_ENDPOINT + "/questions/new").replyOnce(
                HttpStatusCode.Ok,
                mockQuestion
            );

            const result = await getQuestion();

            expect(result).toEqual(mockQuestion);
        });
    });

    describe("answerQuestion function", () => {
        beforeEach(() => {
            authManager.reset();
            mockAxios = new MockAdapter(authManager.getAxiosInstance());
        });

        it("successfully answers a question", async () => {
            const mockResponse = {
                success: true,
                message: "Answer submitted successfully.",
            };

            mockAxios.onPost(process.env.REACT_APP_API_ENDPOINT + "/questions/123/answer").replyOnce(
                HttpStatusCode.Ok,
                mockResponse
            );

            const result = await answerQuestion(123, "a1");

            expect(result).toEqual(mockResponse);
        });
    });
});
