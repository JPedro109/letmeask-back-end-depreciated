import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { getQuestions } from "./Factory";

export default new class DeleteQuestionController {

	async handle(request: IRequestRouters) {
		const { roomCode } = request.params;

		const response = await getQuestions.execute({ roomCode });

		return ok(response);
	}
};