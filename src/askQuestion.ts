import readline from "readline";
import he from "he";
import { fetchTriviaQuestion } from "./fetchTriviaQuestion";
import { TriviaQuestion } from "./types";

export async function askQuestion() {
  const triviaQuestion = await fetchTriviaQuestion();

  if (!triviaQuestion) {
    console.log("No trivia questions available.");
    return false;
  }

  displayQuestion(triviaQuestion);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    function checkAnswer(answer: string, attempts = 0) {
      if (
        answer.toLowerCase() === triviaQuestion!.correct_answer.toLowerCase()
      ) {
        console.log("Correct!");
        rl.close();
        resolve(true);
      } else if (answer.trim() === "" || attempts >= 3) {
        displayAnswer(triviaQuestion!);
        rl.close();
        resolve(false);
      } else {
        console.log("Incorrect!");
        rl.question("Try again:", (answer: string) =>
          checkAnswer(answer, attempts + 1),
        );
      }
    }

    rl.question("Enter your answer (true or false): ", checkAnswer);
  });
}

function displayQuestion(question: TriviaQuestion) {
  console.log("Question:", he.decode(question.question));
}

function displayAnswer(question: TriviaQuestion) {
  console.log("Answer:", he.decode(question.correct_answer));
}
