import { setup } from "../setup";
import { Rules as DeleteQuestion } from "../../../core/useCases/Question/DeleteQuestion/Rules";
import { questionRepositoryInMemory, roomRepositoryInMemory } from "../Mock";

describe("Unit Test - Delete Question", () => {

	setup();

	test("Should delete the question", async () => {
		const deleteQuestion = new DeleteQuestion(questionRepositoryInMemory, roomRepositoryInMemory);

		const question = {
			questionId: "1",
			userId: "3",
		};

		const response = await deleteQuestion.execute(question);
		expect(response).toBe(question.questionId);
	});
});