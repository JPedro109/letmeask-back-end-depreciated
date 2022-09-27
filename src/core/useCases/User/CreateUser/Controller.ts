import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { created } from "../../../adapter/adapterResponse";
import { createUser } from "./Factory";

export default new class CreateUserController {

	async handle(request: IRequestRouters) {
		const { email, name, password, passwordConfirm } = request.body;

		const response = await createUser.execute({ email, name, password, passwordConfirm });

		return created(response);
	}
};