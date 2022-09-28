import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { deleteQuestion } from "./Factory";

export default new class DeleteQuestionController {

	async handle(request: IRequestRouters) {
		const { questionId } = request.params;

		const userId = request.userId;

		const response = await deleteQuestion.execute({ questionId, userId });

		return ok(response);
	}
};