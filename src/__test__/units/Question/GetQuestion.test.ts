import { setup } from "../setup";
import { Rules as GetQuestion } from "../../../core/useCases/Question/GetQuestions/Rules";
import { questionRepositoryInMemory, responseRepositoryInMemory } from "../Mock";

describe("Unit Test - Get Questions", () => {

	setup();

	test("Should get questions", async () => {
		const getQuestion = new GetQuestion(questionRepositoryInMemory, responseRepositoryInMemory);

		const question = {
			roomCode: "1"
		};

		const response = await getQuestion.execute(question);
		expect(response[0].id).toBe("1");
		expect(response[0].userId).toBe("3");
		expect(response[0].question).toBe("Question?");
	});
});