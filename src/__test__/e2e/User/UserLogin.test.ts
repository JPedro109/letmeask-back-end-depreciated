import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - User Login", () => {

	setup();

	test("Should not return the token, because the email field is empty", async () => {
		const user = {
			email: "",
			password: "Password1234"
		};

		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});
	
	test("Should not return the token, because the password field is empty", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			password: ""
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not return the token, because all fields are empty", async () => {
		const user = {
			email: "",
			password: ""
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not return the token, because the email is incorrect", async () => {
		const user = {
			email: "emailISNOTEXISTS@test.com",
			password: "Password1234"
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not return the token, because the password is incorrect", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password12345"
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not return the token, because the email was not verified", async () => {
		const user = {
			email: "emailISNOTVERIFIED@test.com",
			password: "Password1234"
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should return the token", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234"
		};
		const response = await request(app)
			.post("/user/login")
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response.accessToken).not.toBeUndefined();
		expect(response.body.response.refreshToken).not.toBeUndefined();
	});
});