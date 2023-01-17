import axios from "axios";
import Question from "../models/Question";

// const DBUrl: string = process.env.REACT_APP_DB_URL || "";
const TriviaUrl: string = process.env.REACT_APP_TRIVIA_URL || "";

export const getQuestions = async (params: any): Promise<Question[]> => {
  return await axios
    .get(`${TriviaUrl}`, {
      params,
    })
    .then((response) => response.data);
};
