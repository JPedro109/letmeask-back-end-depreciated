import { Room } from "../../models/Room";

export interface IRoomRepository {
	store(id: string, userId: string, code: string, name: string): Promise<void>;
	getRoom(code: string): Promise<Room>;
	getUserRoomCode(userId: string): Promise<string>;
	destroy(code: string): Promise<void>;
}