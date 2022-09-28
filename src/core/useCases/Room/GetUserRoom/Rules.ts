import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IRoomRepository) { }

	async execute({ userId }: DTO) {
		return await this.repository.getUserRoomCode(userId);
	}
}