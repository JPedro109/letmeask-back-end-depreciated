import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Send User Email Update Link", () => {

	setup();

	test("Should not send email update link, because the email field is empty", async () => {
		const user = {
			email: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not send email update link, because the email alredy was registered", async () => {
		const user = {
			email: "emailISNOTVERIFIED@test.com"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should send email update link", async () => {
		const user = {
			email: "email@test.com"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/user/email/send-token-update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.email);
	});
});