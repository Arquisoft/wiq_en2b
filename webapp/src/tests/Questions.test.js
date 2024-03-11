import MockAdapter from "axios-mock-adapter";
import { getQuestion, answerQuestion } from "components/game/Questions";
import axios, { HttpStatusCode } from "axios";

const mockAxios = new MockAdapter(axios);

describe("Question Service tests", () => {
    describe("getQuestion function", () => {
        beforeEach(() => {
            mockAxios.reset();
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
            mockAxios.reset();
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
