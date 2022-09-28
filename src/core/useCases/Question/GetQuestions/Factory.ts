import { questionRepository } from "../../../../data/repositories/QuestionRepository";
import { responseRepository } from "../../../../data/repositories/ResponseRepository";
import { Rules as GetQuestions } from "./Rules";

export const getQuestions = new GetQuestions(questionRepository, responseRepository);