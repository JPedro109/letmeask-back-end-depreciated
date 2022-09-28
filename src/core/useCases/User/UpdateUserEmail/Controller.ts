import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { updateUserEmail } from "./Factory";

export default new class UpdateUserEmailController {

	async handle(request: IRequestRouters) {
		const { email, token } = request.query;

		const userId = request.userId;

		const response = await updateUserEmail.execute({ userId, email, token });

		return ok(response);
	}
};