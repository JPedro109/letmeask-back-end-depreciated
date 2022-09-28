import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IRoomRepository) { }

	async execute({ roomCode }: DTO) {
		return await this.repository.getRoom(roomCode);
	}
}