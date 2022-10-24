import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Update Username", () => {

	setup();

	test("Should not update username, because name field is empty", async () => {
		const user = {
			name: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-name")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should update username", async () => {
		const user = {
			name: "Pedro"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.patch("/update-name")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(user);

		expect(response.statusCode).toBe(200);
		expect(response.body.response).toBe(user.name);
	});
});