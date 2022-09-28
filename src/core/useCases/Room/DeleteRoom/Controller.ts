import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { deleteRoom } from "./Factory";

export default new class DeleteRoomController {

	async handle(request: IRequestRouters) {
		const { roomCode } = request.params;

		const userId = request.userId;

		const response = await deleteRoom.execute({ roomCode, userId });

		return ok(response);
	}
};