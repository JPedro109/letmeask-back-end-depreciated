import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Send User Password Recover Link", () => {

	setup();

	test("Should not send the recovery password email, because the email field is empty", async () => {
		const user = {
			email: ""
		};
		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not send the recovery password email, because the email is not registered", async () => {
		const user = {
			email: "emaifISNOTEXISTS@test.com"
		};
		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should send the recovery password email", async () => {
		const user = {
			email: "emailVERIFIED@test.com"
		};
		const response = await request(app)
			.post("/user/password/send-token-password-recover")
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.email);
	});
});