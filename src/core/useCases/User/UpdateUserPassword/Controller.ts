import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { updateUserPassword } from "./Factory";

export default new class UpdateUserPasswordController {

	async handle(request: IRequestRouters) {
		const { password, passwordConfirm, passwordCurrent } = request.body;

		const userId = request.userId;

		const response = await updateUserPassword.execute({ userId, password, passwordConfirm, passwordCurrent });

		return ok(response);
	}
};