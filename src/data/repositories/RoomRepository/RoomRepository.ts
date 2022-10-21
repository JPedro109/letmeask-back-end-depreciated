import { Room } from "../../models/Room";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IRoomRepository } from "./IRoomRepository";

export class RoomRepository implements IRoomRepository {

	constructor(private adapter: IDBAdapter) { }

	async store(id: string, userId: string, code: string, name: string): Promise<void> {
		await this.adapter.setEntity("room").insert<Room>({
			id,
			user_id: userId,
			code,
			name
		});
	}

	async getRoom(code: string): Promise<Room> {
		return await this.adapter.setEntity("room").getOne<Room>({ code });
	}

	async getUserRoomCode(userId: string): Promise<string> {
		const room = await this.adapter.setEntity("room").getOne<Room>({ user_id: userId });

		return room?.code;
	}

	async destroy(code: string): Promise<void> {
		await this.adapter.setEntity("room").delete<Room>({ code });
	}
}