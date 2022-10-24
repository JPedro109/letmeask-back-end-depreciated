import { setup } from "../setup";
import { Rules as DeleteQuestion } from "../../../core/useCases/Question/DeleteQuestion/Rules";
import { questionRepository } from "../../../data/repositories/QuestionRepository";
import { roomRepository } from "../../../data/repositories/RoomRepository";

describe("Integration Test - Delete Question", () => {

	setup();

	test("Should delete the question", async () => {
		const deleteQuestion = new DeleteQuestion(questionRepository, roomRepository);

		const question = {
			questionId: "1",
			userId: "3",
		};

		const response = await deleteQuestion.execute(question);
		expect(response).toBe(question.questionId);
	});
});