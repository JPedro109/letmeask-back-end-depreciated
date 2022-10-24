import { setup } from "../setup";
import { Rules as DeleteRoom } from "../../../core/useCases/Room/DeleteRoom/Rules";
import { UnauthorizedError } from "../../../utils/error";
import { roomRepositoryInMemory } from "../Mock";

describe("Unit Test - Delete Room", () => {

	setup();

	test("Should not delete room, because user is not the room admin", async () => {
		const deleteRoom = new DeleteRoom(roomRepositoryInMemory);

		const room = {
			userId: "3",
			roomCode: "1"
		};
		await deleteRoom.execute(room).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should delete room", async () => {
		const deleteRoom = new DeleteRoom(roomRepositoryInMemory);

		const room = {
			userId: "1",
			roomCode: "1"
		};
		const response = await deleteRoom.execute(room);
		expect(response).toBe(room.roomCode);
	});
});