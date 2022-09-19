import { Room } from "../../models/Room";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IRoomRepository } from "./IRoomRepository";

export class RoomRepository implements IRoomRepository {

	constructor(private adapter: IDBAdapter<Room>) { }

	async store(id: string, userId: string, code: string, name: string): Promise<void> {
		await this.adapter.insert({
			id,
			user_id: userId,
			code,
			name
		});
	}

	async getRoom(code: string): Promise<Room> {
		return await this.adapter.getOne({ code });
	}

	async getUserRoomCode(userId: string): Promise<string> {
		const room = await this.adapter.getOne({ user_id: userId });

		return room?.code;
	}

	async destroy(code: string): Promise<void> {
		await this.adapter.delete({ code });
	}
}