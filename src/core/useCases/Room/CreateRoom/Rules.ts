import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../../utils/error";
import { DTO } from "./DTO";
import { toolkit } from "../../../../utils/toolkit";

export class Rules {

	constructor(private repository: IRoomRepository) { }

	async execute({ userId, name }: DTO) {
		const roomAlredyExists = await this.repository.getUserRoomCode(userId);

		if (roomAlredyExists) throw new UnauthorizedError("Você já tem uma sala criada, exclua ela para criar outra");

		if (!name) throw new MissingParamError("Preencha o nome da sala");

		const code = `${Math.floor(Math.random() * 100000)}`;

		const id = toolkit.generation.id();

		await this.repository.store(id, userId, code, name);

		return code;
	}
}