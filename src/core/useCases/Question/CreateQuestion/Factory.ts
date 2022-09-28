import { questionRepository } from "../../../../data/repositories/QuestionRepository";
import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as CreateQuestion } from "./Rules";

export const createQuestion = new CreateQuestion(questionRepository, roomRepository);