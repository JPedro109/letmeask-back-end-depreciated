import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Delete Room", () => {

	setup();

	test("Should not delete room, because user is not the room admin", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/room/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should delete room", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/room/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("1");
	});
});