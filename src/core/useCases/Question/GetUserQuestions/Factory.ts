import { questionRepository } from "../../../../data/repositories/QuestionRepository";
import { responseRepository } from "../../../../data/repositories/ResponseRepository";
import { Rules as GetUserQuestions } from "./Rules";

export const getUserQuestions = new GetUserQuestions(questionRepository, responseRepository);