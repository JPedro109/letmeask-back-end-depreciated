import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Create Question", () => {

	setup();

	test("Should not create question, because question field is empty", async () => {
		const question = {
			question: "",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/question/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(question);

		expect(response.statusCode).toBe(400);
		expect(response.body.code).toBe("MissingParamError");
	});

	test("Should not create question, because the user is room admin", async () => {
		const question = {
			question: "Question?",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailVERIFIED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/question/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(question);

		expect(response.statusCode).toBe(401);
		expect(response.body.code).toBe("UnauthorizedError");
	});

	test("Should create question", async () => {
		const question = {
			question: "Question?",
		};

		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.post("/question/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`)
			.send(question);

		expect(response.statusCode).toBe(201);
		expect(response.body.response).toBe("Question?");
	});
});