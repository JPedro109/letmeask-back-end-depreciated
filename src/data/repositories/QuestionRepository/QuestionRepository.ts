import { Question } from "../../models/Question";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IQuestionRepository } from "./IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {

	constructor(private adapter: IDBAdapter<Question>) { }

	async store(id: string, userId: string, roomCode: string, question: string): Promise<void> {
		await this.adapter.insert({
			id,
			user_id: userId,
			room_code: roomCode,
			question
		});
	}

	async getQuestions(roomCode: string): Promise<Question[]> {
		return await this.adapter.getAll({ room_code: roomCode });
	}

	async getUserQuestions(userId: string): Promise<Question[]> {
		return await this.adapter.getAll({ user_id: userId });
	}

	async destroy(questionId: string): Promise<void> {
		await this.adapter.delete({ id: questionId });
	}
}