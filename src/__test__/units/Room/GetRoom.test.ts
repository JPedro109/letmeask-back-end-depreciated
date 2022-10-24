import { setup } from "../setup";
import { Rules as GetRoom } from "../../../core/useCases/Room/GetRoom/Rules";
import { roomRepositoryInMemory } from "../Mock";

describe("Unit Test - Get Room", () => {

	setup();

	test("Should get room", async () => {
		const getRoom = new GetRoom(roomRepositoryInMemory);

		const room = {
			roomCode: "1"
		};
		const response = await getRoom.execute(room);
		expect(response.code).toBe("1");
		expect(response.name).toBe("Room");
	});
});