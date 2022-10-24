import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Create Room", () => {

	setup();

	test("Should not create room, because the name is empty", async () => {
		const room = {
			name: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/room")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(room);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create room, because user alredy created has a room", async () => {
		const room = {
			name: "Room"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/room")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(room);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should create room", async () => {
		const room = {
			name: "Room"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/room")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(room);

		expect(response.statusCode).toBe(201);
		expect(response.body.response.name).toBe(room.name);
	});
    
});