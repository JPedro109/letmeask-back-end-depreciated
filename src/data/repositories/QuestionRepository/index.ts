import { dbAdapter } from "../../adapter";
import { QuestionRepository } from "./QuestionRepository";

export const questionRepository = new QuestionRepository(dbAdapter);