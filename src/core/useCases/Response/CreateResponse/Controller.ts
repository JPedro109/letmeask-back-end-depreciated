import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { created } from "../../../adapter/adapterResponse";
import { createResponse } from "./Factory";

export default new class CreateResponseController {

	async handle(request: IRequestRouters) {
		const { ["response"]: userResponse } = request.body;

		const { questionId, roomCode } = request.params;

		const userId = request.userId;

		const response = await createResponse.execute({ userId, questionId, response: userResponse, roomCode });

		return created(response);
	}
};