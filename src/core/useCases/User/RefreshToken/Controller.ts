import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { refreshToken } from "./Factory";

export default new class UserLoginController {

	async handle(request: IRequestRouters) {
		const { ["refreshToken"]: token } = request.body;

		const response = await refreshToken.execute({ refreshToken: token });

		return ok(response);
	}
};