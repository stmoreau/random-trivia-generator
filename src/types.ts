export type TriviaResponse = {
  response_code: number;
  results: TriviaQuestion[];
};

export type TriviaQuestion = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
