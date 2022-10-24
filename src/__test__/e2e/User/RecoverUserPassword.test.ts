import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Recover User Password", () => {
	
	setup();

	test("Should not recovery password, because the field email is empty", async () => {
		const user = {
			email: "",
			token: "token",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not recovery password, because the verification token field is empty", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not recovery password, because the password new field is empty", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token",
			password: "",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not recovery password, because the confirm new password field is empty", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token",
			password: "Password12345",
			passwordConfirm: "",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not recovery password, because all fields are empty", async () => {
		const user = {
			email: "",
			token: "",
			password: "",
			passwordConfirm: "",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not recovery password, because the verification token is incorrect", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token-incorrect",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not recovery password, because the link was expired", async () => {
		const user = {
			email: "emailWITHTOKENEXPIRED@test.com",
			token: "token",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not recovery password, because the password is equal as previous", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should not recovery password, because the passwords is not match", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token",
			password: "Password12345",
			passwordConfirm: "Password123456",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("InvalidParamError");
	});

	test("Should recovery password", async () => {
		const user = {
			email: "emailVERIFIED@test.com",
			token: "token",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const response = await request(app)
			.patch("/user/password/password-recover")
			.query({
				email: user.email,
				token: user.token,
			})
			.send({
				password: user.password,
				passwordConfirm: user.passwordConfirm,
			});

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.email);
	});
});