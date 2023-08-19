import axios, { AxiosResponse, AxiosError } from "axios";
import { TriviaQuestion, TriviaResponse } from "./types";

export async function fetchTriviaQuestion(): Promise<TriviaQuestion | null> {
  try {
    const response: AxiosResponse<TriviaResponse> = await axios.get(
      "https://opentdb.com/api.php?amount=1&type=boolean"
    );
    return response.data.results[0];
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.message);
  }
}
