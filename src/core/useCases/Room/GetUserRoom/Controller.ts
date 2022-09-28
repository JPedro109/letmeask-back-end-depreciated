import { IRequestRouters } from "../../../adapter/interfaces/IRequestRouters";
import { ok } from "../../../adapter/adapterResponse";
import { getUserRoom } from "./Factory";

export default new class GetUserRoomController {

	async handle(request: IRequestRouters) {
		const userId = request.userId;

		const response = await getUserRoom.execute({ userId });

		return ok(response);
	}
};