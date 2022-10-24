import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Get User Room Code", () => {

	setup();

	test("Should get user room code", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.get("/room-code")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("1");
	});
});