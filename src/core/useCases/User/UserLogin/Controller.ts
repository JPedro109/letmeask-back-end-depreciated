import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { userLogin } from "./Factory";

export default new class UserLoginController {

	async handle(request: IRequestRouters) {
		const { email, password } = request.body;

		const response = await userLogin.execute({ email, password });

		return ok(response);
	}
};