import { IRoomRepository } from "../../../../data/repositories/RoomRepository/IRoomRepository";
import { UnauthorizedError } from "../../../../utils/error";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IRoomRepository) { }

	async execute({ roomCode, userId }: DTO) {

		const roomCodeUser = await this.repository.getUserRoomCode(userId);

		if (roomCode !== roomCodeUser) throw new UnauthorizedError("Só o adminstrador da sala pode fazer essa ação");

		await this.repository.destroy(roomCode);
		return roomCode;
	}
}