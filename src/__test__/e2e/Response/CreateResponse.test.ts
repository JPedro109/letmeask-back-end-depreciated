import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";


describe("E2E - Create Response", () => {

	setup();

	test("Should not create response, because the user is not room admin", async () => {
		const responseBody = {
			response: "Response"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/response/1/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(responseBody);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should not create response, because response field is empty", async () => {
		const responseBody = {
			response: ""
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/response/1/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(responseBody);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should create the response", async () => {
		const responseBody = {
			roomCode: "1",
			questionId: "1",
			userId: "1",
			response: "Response"
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/response/1/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(responseBody);

		expect(response.statusCode).toBe(201);
		expect(response.body.response).toBe("Response");
	});
});