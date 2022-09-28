import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { getRoom } from "./Factory";

export default new class GetRoomController {

	async handle(request: IRequestRouters) {
		const { roomCode } = request.params;

		const response = await getRoom.execute({ roomCode });

		return ok(response);
	}
};