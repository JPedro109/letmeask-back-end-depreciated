import { IResponseRepository } from "../../../../data/repositories/ResponseRepository/IResponseRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../../utils/error";
import { DTO } from "./DTO";
import { toolkit } from "../../../../utils/toolkit";
import { Questions } from "../../../types";
import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";

export class Rules {

	constructor(
		private responseRepository: IResponseRepository, 
		private questionRepository: IQuestionRepository ,
		private roomRepository: IRoomRepository
	) { }

	async execute({ userId, questionId, response, roomCode }: DTO) {

		if (!response) throw new MissingParamError("Preencha o nome da resposta");

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);
		const question = await this.questionRepository.getQuestion(questionId);

		if (roomCode !== roomCodeUser) throw new UnauthorizedError("Só o adminstrador da sala pode responder perguntas");

		const id = toolkit.generation.id();

		await this.responseRepository.store(
			id,
			questionId,
			response,
		);

		const userIdCreateQuestion = question.user_id;

		const roomQuestions = toolkit.cache.get<Questions>(roomCode);
		const userQuestions = toolkit.cache.get<Questions>(userIdCreateQuestion);

		roomQuestions?.forEach(element => {
			if(element.id === questionId) element.response = response;
		});

		userQuestions?.forEach(element => {
			if(element.id === questionId) element.response = response;
		});

		toolkit.cache.del(roomCode);
		toolkit.cache.set<Questions>(roomCode, roomQuestions);

		toolkit.cache.del(userIdCreateQuestion);
		toolkit.cache.set<Questions>(userIdCreateQuestion, userQuestions);

		return response;
	}
}