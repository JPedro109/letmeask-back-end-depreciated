import { setup } from "../setup";
import { Rules as GetUserRoom } from "../../../core/useCases/Room/GetUserRoom/Rules";
import { roomRepository } from "../../../data/repositories/RoomRepository";

describe("Integration Test - Get User Room Code", () => {

	setup();

	test("Should get user room code", async () => {
		const getUserRoom = new GetUserRoom(roomRepository);

		const room = {
			userId: "1"
		};
		const response = await getUserRoom.execute(room);
		expect(response).toBe("1");
	});
});