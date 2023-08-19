import { askQuestion } from "./askQuestion";
import { fetchTriviaQuestion } from "./fetchTriviaQuestion";
import readline from "readline";

jest.mock("readline", () => {
  return {
    createInterface: jest.fn().mockReturnValue({
      question: jest.fn((prompt, callback) => callback("True")),
      close: jest.fn(),
    }),
  };
});

jest.mock("./fetchTriviaQuestion");

describe("askQuestion", () => {
  it("returns true when the answer is correct", async () => {
    (fetchTriviaQuestion as jest.Mock).mockResolvedValue({
      question: "Test question",
      correct_answer: "True",
      incorrect_answers: ["False"],
    });

    const result = await askQuestion();

    expect(result).toBe(true);
  });

  it("returns false when the answer is incorrect", async () => {
    (fetchTriviaQuestion as jest.Mock).mockResolvedValue({
      question: "Test question",
      correct_answer: "False",
      incorrect_answers: ["True"],
    });

    const result = await askQuestion();

    expect(result).toBe(false);
  });

  it("returns false when no question is available", async () => {
    (fetchTriviaQuestion as jest.Mock).mockResolvedValue(null);

    const result = await askQuestion();

    expect(result).toBe(false);
  });
});
