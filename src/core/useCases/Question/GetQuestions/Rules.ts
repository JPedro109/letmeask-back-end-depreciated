import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IResponseRepository } from "../../../../data/repositories/ResponseRepository/IResponseRepository";
import { DTO } from "./DTO";

export class Rules {

	constructor(private questionRepository: IQuestionRepository, private responseRepository: IResponseRepository) { }

	async execute({ roomCode }: DTO) {
		const questions = await this.questionRepository.getQuestions(roomCode);
		const questionsFormated = [];

		for (let i = 0; i < questions.length; i++) {
			const response = await this.responseRepository.getResponse(questions[i].id);
			questionsFormated.push({
				id: questions[i].id,
				userId: questions[i].user_id,
				question: questions[i].question,
				response: response?.response
			});
		}

		return questionsFormated;
	}
}