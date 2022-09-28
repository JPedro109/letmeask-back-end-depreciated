import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { recoverUserPassword } from "./Factory";

export default new class RecoverUserPasswordController {

	async handle(request: IRequestRouters) {
		const { email, token } = request.query;

		const { password, passwordConfirm } = request.body;

		const response = await recoverUserPassword.execute({ email, password, passwordConfirm, token });

		return ok(response);
	}
};