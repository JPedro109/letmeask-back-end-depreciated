import { setup } from "../setup";
import { Rules as CreateQuestion } from "../../../core/useCases/Question/CreateQuestion/Rules";
import { UnauthorizedError, MissingParamError } from "../../../utils/error";
import { questionRepositoryInMemory, roomRepositoryInMemory } from "../Mock";

describe("Unit Test - Create Question", () => {

	setup();

	test("Should not create question, because question field is empty", async () => {
		const createQuestion = new CreateQuestion(questionRepositoryInMemory, roomRepositoryInMemory);

		const question = {
			question: "",
			userId: "3",
			roomCode: "1"
		};

		await createQuestion.execute(question).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create question, because the user is room admin", async () => {
		const createQuestion = new CreateQuestion(questionRepositoryInMemory, roomRepositoryInMemory);

		const question = {
			question: "Question?",
			userId: "1",
			roomCode: "1"
		};

		await createQuestion.execute(question).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should create question", async () => {
		const createQuestion = new CreateQuestion(questionRepositoryInMemory, roomRepositoryInMemory);

		const question = {
			question: "Question?",
			userId: "3",
			roomCode: "1"
		};

		await createQuestion.execute(question).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});
});