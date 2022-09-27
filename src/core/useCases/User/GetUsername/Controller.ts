import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { getUsername } from "./Factory";

export default new class GetUsernameController {

	async handle(request: IRequestRouters) {
		const userId = request.userId;

		const response = await getUsername.execute({ userId });

		return ok(response);
	}
};