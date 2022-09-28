import { questionRepository } from "../../../../data/repositories/QuestionRepository";
import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as DeleteQuestion } from "./Rules";

export const deleteQuestion = new DeleteQuestion(questionRepository, roomRepository);