import { setup } from "../setup";
import { Rules as CreateResponse } from "../../../core/useCases/Response/CreateResponse/Rules";
import { responseRepository } from "../../../data/repositories/ResponseRepository";
import { roomRepository } from "../../../data/repositories/RoomRepository";
import { MissingParamError, UnauthorizedError } from "../../../utils/error";

describe("Integration Test - Create Response", () => {

	setup();

	test("Should not create response, because the user is not room admin", async () => {
		const createResponse = new CreateResponse(responseRepository, roomRepository);

		const responseBody = {
			roomCode: "1",
			questionId: "1",
			userId: "1",
			response: ""
		};

		await createResponse.execute(responseBody).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create response, because response field is empty", async () => {
		const createResponse = new CreateResponse(responseRepository, roomRepository);

		const responseBody = {
			roomCode: "1",
			questionId: "1",
			userId: "3",
			response: "Response"
		};

		await createResponse.execute(responseBody).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should create the response", async () => {
		const createResponse = new CreateResponse(responseRepository, roomRepository);

		const responseBody = {
			roomCode: "1",
			questionId: "1",
			userId: "1",
			response: "Response"
		};

		const response = await createResponse.execute(responseBody);
		expect(response).toBe(responseBody.response);
	});
});