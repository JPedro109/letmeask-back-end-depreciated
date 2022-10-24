import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Verify Email User", () => {

	setup();

	test("Should not verify email, because the email field is empty", async () => {
		const user = {
			email: "",
			token: "token"
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not verify email, because the token field is empty", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: ""
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not verify email, because all fields are empty", async () => {
		const user = {
			email: "",
			token: ""
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not verify email, because the email alredy was verified", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token"
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not verify email, because the token is incorrect", async () => {
		const user = {
			email: "emailISNOTVERIFIED@test.com",
			token: "token-incorrect"
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should the verify email", async () => {
		const user = {
			email: "emailISNOTVERIFIED@test.com",
			token: "token"
		};
		const response = await request(app)
			.post("/verify-email")
			.query(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.email);
	});
});