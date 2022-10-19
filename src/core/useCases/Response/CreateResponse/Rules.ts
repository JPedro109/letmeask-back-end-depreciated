import { IResponseRepository } from "../../../../data/repositories/ResponseRepository/IResponseRepository";
import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../../utils/error";
import { DTO } from "./DTO";

export class Rules {

	constructor(private responseRepository: IResponseRepository, private roomRepository: IRoomRepository) { }

	async execute({ userId, questionId, response, roomCode }: DTO) {

		if (!response) throw new MissingParamError("Preencha o nome da resposta");

		const roomCodeUser = await this.roomRepository.getUserRoomCode(userId);

		if (roomCode !== roomCodeUser) throw new UnauthorizedError("Só o adminstrador da sala pode responder perguntas");

		await this.responseRepository.store(
			userId,
			questionId,
			response,
		);

		return response;
	}
}