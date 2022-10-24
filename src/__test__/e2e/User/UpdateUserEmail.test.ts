import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Update User Email", () => {

	setup();

	test("Should not update email, because the email field is empty", async () => {
		const user = {
			email: "",
			token: "token"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update email, because the verification token field is empty", async () => {
		const user = {
			email: "email@test.com",
			token: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update email, because the fields email and token are empty", async () => {
		const user = {
			email: "",
			token: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update email, because the verification token is incorrect", async () => {
		const user = {
			email: "email@test.com",
			token: "token-incorrect"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not update email, because the update email link was expired", async () => {
		const user = {
			userId: "3",
			email: "email@test.com",
			token: "token"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should update email", async () => {
		const user = {
			email: "email@test.com",
			token: "token"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-email")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.query(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.email);
	});
});