import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { sendUserPasswordRecoveryLink } from "./Factory";

export default new class SendUserPasswordRecoveryLinkController {

	async handle(request: IRequestRouters) {
		const { email } = request.body;

		const response = await sendUserPasswordRecoveryLink.execute({ email });

		return ok(response);
	}
};