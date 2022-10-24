import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Delete User", () => {

	setup();

	test("Should not delete user, because the password field is empty", async () => {
		const user = {
			password: "",
			passwordConfirm: "Password1234",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not delete user, because the password confirm field is empty", async () => {
		const user = {
			password: "Password1234",
			passwordConfirm: "",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not delete user, because password and password fields are empty", async () => {
		const user = {
			password: "",
			passwordConfirm: "",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not delete user, because the password is not match", async () => {
		const user = {
			password: "Password1234",
			passwordConfirm: "Password12345",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not delete user, because the password is incorrect", async () => {
		const user = {
			password: "Password123456",
			passwordConfirm: "Password123456",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should delete user", async () => {

		const user = {
			password: "Password1234",
			passwordConfirm: "Password1234",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/user/delete")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("1");
	});
});