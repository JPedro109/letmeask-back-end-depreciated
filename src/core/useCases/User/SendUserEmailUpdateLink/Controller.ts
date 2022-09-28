import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { sendUserEmailUpdateLink } from "./Factory";

export default new class SendUserEmailUpdateLinkController {

	async handle(request: IRequestRouters) {
		const { email } = request.body;

		const userId = request.userId;

		const response = await sendUserEmailUpdateLink.execute({ email, userId });

		return ok(response);
	}
};