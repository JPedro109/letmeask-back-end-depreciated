import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { deleteUser } from "./Factory";

export default new class DeleteUserController {

	async handle(request: IRequestRouters) {
		const { password, passwordConfirm } = request.body;

		const userId = request.userId;

		const response = await deleteUser.execute({ userId, password, passwordConfirm });

		return ok(response);
	}
};