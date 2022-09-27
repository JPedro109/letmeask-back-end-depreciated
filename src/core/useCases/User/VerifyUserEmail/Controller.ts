import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { verifyUserEmail } from "./Factory";

export default new class VerifyUserEmailController {

	async handle(request: IRequestRouters) {
		const { email, token } = request.query;

		const response = await verifyUserEmail.execute({ email, token });

		return ok(response);
	}
};