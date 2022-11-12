import { IQuestionRepository } from "../../../../data/repositories/QuestionRepository/IQuestionRepository";
import { IResponseRepository } from "../../../../data/repositories/ResponseRepository/IResponseRepository";
import { toolkit } from "../../../../utils/toolkit";
import { Questions } from "../../../types";
import { DTO } from "./DTO";

export class Rules {

	constructor(
		private questionRepository: IQuestionRepository, 
		private responseRepository: IResponseRepository
	) { }

	async execute({ roomCode }: DTO): Promise<Questions> {
		const questionsInCache = toolkit.cache.get<Questions>(roomCode);

		if(!questionsInCache) {
			const questionsInDatabase = await this.questionRepository.getQuestions(roomCode);

			if(questionsInDatabase?.length > 0) {
				const questions: Questions = [];

				for(let i = 0; i < questionsInDatabase.length; i++) {
					const response = await this.responseRepository.getResponse(questionsInDatabase[i].id);

					questions.push({
						id: questionsInDatabase[i].id,
						userId: questionsInDatabase[i].user_id,
						question: questionsInDatabase[i].question,
						response: response?.response,
					});
				}

				toolkit.cache.set<Questions>(roomCode, questions);

				return toolkit.cache.get<Questions>(roomCode);
			}

			return [];

		}

		return questionsInCache;
	}
}