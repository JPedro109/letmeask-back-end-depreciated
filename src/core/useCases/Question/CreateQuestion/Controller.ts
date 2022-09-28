import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { created } from "../../../adapter/adapterResponse";
import { createQuestion } from "./Factory";

export default new class CreateQuestionController {

	async handle(request: IRequestRouters) {
		const { question } = request.body;

		const { roomCode } = request.params;

		const userId = request.userId;

		const response = await createQuestion.execute({ userId, roomCode, question });

		return created(response);
	}
};