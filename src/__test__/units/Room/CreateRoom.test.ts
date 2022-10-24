import { setup } from "../setup";
import { Rules as CreateRoom } from "../../../core/useCases/Room/CreateRoom/Rules";
import { UnauthorizedError, MissingParamError } from "../../../utils/error";
import { roomRepositoryInMemory } from "../Mock";

describe("Unit Test - Create Room", () => {

	setup();

	test("Should not create room, because the name is empty", async () => {
		const createRoom = new CreateRoom(roomRepositoryInMemory);

		const room = {
			userId: "1",
			name: ""
		};
		await createRoom.execute(room).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create room, because user alredy created has a room", async () => {
		const createRoom = new CreateRoom(roomRepositoryInMemory);

		const room = {
			userId: "1",
			name: "Room"
		};
		await createRoom.execute(room).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should create room", async () => {
		const createRoom = new CreateRoom(roomRepositoryInMemory);

		const room = {
			userId: "3",
			name: "Room"
		};
		const response = await createRoom.execute(room);
		expect(response.name).toBe(room.name);
	});
    
});