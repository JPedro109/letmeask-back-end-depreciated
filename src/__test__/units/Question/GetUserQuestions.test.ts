import { setup } from "../setup";
import { Rules as GetUserQuestions } from "../../../core/useCases/Question/GetUserQuestions/Rules";
import { questionRepositoryInMemory, responseRepositoryInMemory } from "../Mock";

describe("Unit Test - Get User Questions", () => {

	setup();

	test("Should get user questions", async () => {
		const getUserQuestion = new GetUserQuestions(questionRepositoryInMemory, responseRepositoryInMemory);

		const question = {
			userId: "3"
		};

		const response = await getUserQuestion.execute(question);
		expect(response[0].id).toBe("1");
		expect(response[0].userId).toBe("3");
		expect(response[0].question).toBe("Question?");
	});
});