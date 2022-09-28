import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { UnauthorizedError } from "../../../../utils/error";
import { DTO } from "./DTO";

export class Rules {

	constructor(private questionRepository: IQuestionRepository, private roomRepository: IRoomRepository) { }

	async execute({ questionId, userId }: DTO) {

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);

		const questions = await this.questionRepository.getUserQuestions(userId);

		const question = questions.filter(element => element.id === questionId)[0];

		if (question?.user_id !== userId) {
			await this.questionRepository.destroy(questionId);
			return "Questão excluída com sucesso";
		}

		if (question?.room_code !== roomCodeUser) {
			await this.questionRepository.destroy(questionId);
			return "Questão excluída com sucesso";
		}

		throw new UnauthorizedError("Só o adminstrador da sala e o criador da questão podem apaga-lá");
	}
}