import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { created } from "../../../adapter/adapterResponse";
import { createRoom } from "./Factory";

export default new class CreateRoomController {

	async handle(request: IRequestRouters) {
		const { name } = request.body;

		const userId = request.userId;

		const response = await createRoom.execute({ userId, name });

		return created(response);
	}
};