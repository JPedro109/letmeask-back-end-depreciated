import { Question } from "../../../../data/models/Question";
import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../../utils/error";
import { toolkit } from "../../../../utils/toolkit";
import { Questions } from "../../../types";
import { DTO } from "./DTO";

export class Rules {

	constructor(private questionRepository: IQuestionRepository, private roomRepository: IRoomRepository) { }

	private addCache(roomCode: string, userId: string, questionObject: Question): void {
		const { id, question } = questionObject;

		const roomQuestions = toolkit.cache.get<Questions>(roomCode);  

		if(!roomQuestions) {
			const initRoomQuestions: Questions = [];

			initRoomQuestions.push({
				id,
				userId,
				question,
				response: null
			});

			toolkit.cache.set<Questions>(roomCode, initRoomQuestions);
		} else {
			roomQuestions.push({
				id,
				userId,
				question,
				response: null
			});
			toolkit.cache.del(roomCode);
			toolkit.cache.set<Questions>(roomCode, roomQuestions);
		}

		const userQuestions = toolkit.cache.get<Questions>(userId);  

		if(!userQuestions) {
			const initUserQuestions: Questions = [];

			initUserQuestions.push({
				id,
				userId,
				question,
				response: null
			});

			toolkit.cache.set<Questions>(userId, initUserQuestions);
		} else {
			userQuestions.push({
				id,
				userId,
				question,
				response: null
			});
			toolkit.cache.del(userId);
			toolkit.cache.set<Questions>(userId, userQuestions);
		}
	}

	async execute({ question, userId, roomCode }: DTO) {

		if (!question) throw new MissingParamError("Preencha o nome da questão");

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);

		if (roomCode === roomCodeUser) throw new UnauthorizedError("O adminstrador da sala não pode criar perguntas");

		const id = toolkit.generation.id();

		const questionCreated = await this.questionRepository.store(
			id,
			userId,
			roomCode,
			question
		);

		this.addCache(roomCode, userId, questionCreated);

		return question;
	}
}