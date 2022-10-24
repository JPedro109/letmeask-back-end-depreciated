import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Refresh Token", () => {

	setup();

	test("Should not return the token, because the refresh is invalid", async () => {
		const user = {
			refreshToken: "invalid",
		};
		
		const response = await request(app)
			.post("/refresh-token")
			.send(user);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should return the token", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234"
		};
		const token = await request(app)
			.post("/user/login")
			.send(user);

		const response = await request(app)
			.post("/refresh-token")
			.send({ refreshToken: token.body.response.refreshToken });

		expect(response.statusCode).toBe(200);
		expect(response.body.response).not.toBeUndefined();
	});
});