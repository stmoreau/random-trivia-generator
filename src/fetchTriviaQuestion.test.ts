import axios from "axios";
import { fetchTriviaQuestion } from "./fetchTriviaQuestion";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchTriviaQuestion", () => {
  it("fetches trivia question successfully", async () => {
    const triviaQuestion = {
      question: "Test question",
      correct_answer: "True",
      incorrect_answers: ["False"],
    };

    const response = {
      data: {
        response_code: 0,
        results: [triviaQuestion],
      },
    };
    mockedAxios.get.mockResolvedValue(response);

    const result = await fetchTriviaQuestion();

    expect(result).toEqual(triviaQuestion);
  });

  it("handles error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network error"));

    await expect(fetchTriviaQuestion()).rejects.toThrow("Network error");
  });
});
