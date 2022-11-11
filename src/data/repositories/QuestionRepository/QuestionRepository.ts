import { Question } from "../../models/Question";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IQuestionRepository } from "./IQuestionRepository";

export class QuestionRepository implements IQuestionRepository {

	constructor(private adapter: IDBAdapter) { }

	async store(id: string, userId: string, roomCode: string, question: string): Promise<Question> {
		return await this.adapter.setEntity("question").insert<Question>({
			id,
			user_id: userId,
			room_code: roomCode,
			question
		});
	}

	async getQuestion(id: string): Promise<Question> {
		return await this.adapter.setEntity("question").getOne<Question>({ id });
	}

	async getQuestions(roomCode: string): Promise<Question[]> {
		return await this.adapter.setEntity("question").getAll<Question>({ room_code: roomCode });
	}

	async getUserQuestions(userId: string): Promise<Question[]> {
		return await this.adapter.setEntity("question").getAll<Question>({ user_id: userId });
	}

	async destroy(questionId: string): Promise<void> {
		await this.adapter.setEntity("question").delete<Question>({ id: questionId });
	}
}