#! /usr/bin/env node

import figlet from "figlet";
import { Command } from "commander";
import axios, { AxiosResponse, AxiosError } from "axios";

console.log(figlet.textSync("Trivia Game", { horizontalLayout: "full" }));

const program = new Command();

program
  .version(JSON.stringify(require("../package.json").version))
  .description("Get random trivia questions and answer them")
  .parse(process.argv);

interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

async function fetchTriviaQuestion(): Promise<TriviaQuestion | null> {
  try {
    const response: AxiosResponse<TriviaResponse> = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=boolean"
    );
    return response.data.results[0];
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error fetching trivia question:", axiosError.message);
    return null;
  }
}

function displayQuestion(question: TriviaQuestion) {
  console.log("Question:", question.question);
}

function displayAnswer(question: TriviaQuestion) {
  console.log("Answer:", question.correct_answer);
}

async function main() {
  const triviaQuestion = await fetchTriviaQuestion();

  if (triviaQuestion) {
    displayQuestion(triviaQuestion);

    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function askQuestion(tryAgain = false) {
      rl.question(
        tryAgain ? "Try again: " : "Enter your answer (true or false): ",
        (answer: string) => {
          if (answer.trim() === "") {
            displayAnswer(triviaQuestion!);
            rl.close();
          } else if (
            answer.toLowerCase() ===
            triviaQuestion!.correct_answer.toLowerCase()
          ) {
            console.log("Correct!");
            rl.close();
          } else {
            console.log("Incorrect!");
            askQuestion();
          }
        }
      );
    }
    askQuestion();
  } else {
    console.log("No trivia questions available.");
    return;
  }
}

main();
