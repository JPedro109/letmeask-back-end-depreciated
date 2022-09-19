import { Question } from "../../models/Question";
import { DBAdapter } from "../../adapter/DBAdapter";
import { QuestionRepository } from "./QuestionRepository";

const adapter = new DBAdapter<Question>("question");
export const questionRepository = new QuestionRepository(adapter);