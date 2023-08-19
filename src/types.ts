export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

export interface TriviaQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
