import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { updateUsername } from "./Factory";

export default new class UpdateUsernameController {

	async handle(request: IRequestRouters) {
		const { name } = request.body;

		const userId = request.userId;

		const response = await updateUsername.execute({ name, userId });

		return ok(response);
	}
};