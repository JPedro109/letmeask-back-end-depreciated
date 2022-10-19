import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../../utils/error";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private questionRepository: IQuestionRepository, private roomRepository: IRoomRepository) { }

	async execute({ question, userId, roomCode }: DTO) {

		if (!question) throw new MissingParamError("Preencha o nome da questão");

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);

		if (roomCode === roomCodeUser) throw new UnauthorizedError("O adminstrador da sala não pode criar perguntas");

		const id = toolkit.generation.id();

		await this.questionRepository.store(
			id,
			userId,
			roomCode,
			question
		);

		return question;
	}
}