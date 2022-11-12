import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { UnauthorizedError } from "../../../../utils/error";
import { toolkit } from "../../../../utils/toolkit";
import { Questions } from "../../../types";
import { DTO } from "./DTO";

export class Rules {

	constructor(
		private questionRepository: IQuestionRepository, 
		private roomRepository: IRoomRepository
	) { }

	private removeCache(roomCode: string, userId: string, id: string): void {
		const roomQuestions = toolkit.cache.get<Questions>(roomCode);

		const indexOne = roomQuestions?.map(element => element.id)?.indexOf(id);
		
		roomQuestions?.splice(indexOne, 1);

		toolkit.cache.del(roomCode);
		toolkit.cache.set<Questions>(roomCode, roomQuestions);

		const userQuestions = toolkit.cache.get<Questions>(userId);

		const indexTwo = userQuestions?.map(element => element.id)?.indexOf(id);

		userQuestions?.splice(indexTwo, 1);

		toolkit.cache.del(userId);
		toolkit.cache.set<Questions>(userId, userQuestions);
	}

	async execute({ questionId, userId }: DTO) {

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);

		const question = await this.questionRepository.getQuestion(questionId);

		if (question.user_id !== userId) {
			await this.questionRepository.destroy(questionId);
			this.removeCache(question.room_code, question.user_id, question.id);
			return questionId;
		}

		if (question.room_code !== roomCodeUser) {
			await this.questionRepository.destroy(questionId);
			this.removeCache(question.room_code, question.user_id, question.id);
			return questionId;
		}

		throw new UnauthorizedError("Só o adminstrador da sala e o criador da questão podem apaga-lá");
	}
}