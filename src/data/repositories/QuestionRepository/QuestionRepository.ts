import { Question } from "../../models/Question";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IQuestionRepository } from "./IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {

	constructor(private adapter: IDBAdapter<Question>) { }

	async store(id: string, userId: string, roomCode: string, name: string): Promise<void> {
		await this.adapter.insert({
			id,
			user_id: userId,
			room_code: roomCode,
			name
		});
	}

	async getQuestions(roomCode: string): Promise<Question[]> {
		return this.adapter.getAll({ room_code: roomCode });
	}

	async getUserQuestions(userId: string): Promise<Question[]> {
		return this.adapter.getAll({ user_id: userId });
	}

	async destroy(roomId: string): Promise<void> {
		await this.adapter.delete({ room_id: roomId });
	}
}