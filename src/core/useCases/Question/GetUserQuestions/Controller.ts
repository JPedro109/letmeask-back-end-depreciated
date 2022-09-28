import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { getUserQuestions } from "./Factory";

export default new class GetUserQuestionsController {

	async handle(request: IRequestRouters) {
		const userId = request.userId;

		const response = await getUserQuestions.execute({ userId });

		return ok(response);
	}
};