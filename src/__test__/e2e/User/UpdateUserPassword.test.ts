import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Update User Password", () => {

	setup();

	test("Should not update password, because the current password field is empty", async () => {
		const user = {
			passwordCurrent: "",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update password, because the password is empty", async () => {
		const user = {
			passwordCurrent: "Password1234",
			password: "",
			passwordConfirm: "Password12345",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update password, because the password confirm field is empty", async () => {
		const user = {
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update password, because all passwords fields are empty", async () => {
		const user = {
			passwordCurrent: "",
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
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not update password, because the new password is not respect rules", async () => {
		const user = {
			passwordCurrent: "Password1234",
			password: "pass1",
			passwordConfirm: "pass1",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("PasswordInvalidError");
	});

	test("Should not update password, because the passwords is not match", async () => {
		const user = {
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "Password123456",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not update password, because the current password is not correct", async () => {
		const user = {
			passwordCurrent: "Password123456",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should update password", async () => {
		const user = {
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/user/password/update")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe("1");
	});
});