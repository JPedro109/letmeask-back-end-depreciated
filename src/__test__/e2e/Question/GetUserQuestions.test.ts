import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Get User Questions", () => {

	setup();

	test("Should get user questions", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.get("/question")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.body.response[0].id).toBe("1");
		expect(response.body.response[0].userId).toBe("3");
		expect(response.body.response[0].question).toBe("Question?");
	});
});