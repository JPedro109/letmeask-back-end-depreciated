import { setup } from "../setup";
import { Rules as GetUserQuestions } from "../../../core/useCases/Question/GetUserQuestions/Rules";
import { userRepository } from "../../../data/repositories/UserRepository";
import { questionRepository } from "../../../data/repositories/QuestionRepository";
import { responseRepository } from "../../../data/repositories/ResponseRepository";

describe("Integration Test - Get User Questions", () => {

	setup();

	test("Should get user questions", async () => {
		const getUserQuestion = new GetUserQuestions(userRepository, questionRepository, responseRepository);

		const question = {
			userId: "3"
		};

		const response = await getUserQuestion.execute(question);
		expect(response[0].id).toBe("1");
		expect(response[0].userId).toBe("3");
		expect(response[0].question).toBe("Question?");
	});
});