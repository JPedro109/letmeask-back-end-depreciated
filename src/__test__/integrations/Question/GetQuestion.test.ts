import { setup } from "../setup";
import { Rules as GetQuestion } from "../../../core/useCases/Question/GetQuestions/Rules";
import { questionRepository } from "../../../data/repositories/QuestionRepository";
import { responseRepository } from "../../../data/repositories/ResponseRepository";

describe("Integration Test - Get Questions", () => {

	setup();

	test("Should get questions", async () => {
		const getQuestion = new GetQuestion(questionRepository, responseRepository);

		const question = {
			roomCode: "1"
		};

		const response = await getQuestion.execute(question);
		expect(response[0].id).toBe("1");
		expect(response[0].userId).toBe("3");
		expect(response[0].question).toBe("Question?");
	});
});