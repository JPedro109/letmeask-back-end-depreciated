import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Delete Question", () => {

	setup();

	test("Should delete the question", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.delete("/question/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.body.response).toBe("1");
	});
});