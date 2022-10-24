import { setup } from "../setup";
import request from "supertest";
import app from "../../../app";

describe("E2E Test - Get Room", () => {

	setup();

	test("Should get room", async () => {
		const token = await request(app)
			.post("/user/login")
			.send({
				email: "emailWITHTOKENEXPIRED@test.com",
				password: "Password1234"
			});
		const response = await request(app)
			.get("/room/1")
			.set("Authorization", `Bearer ${token.body.response.accessToken}`);

		expect(response.statusCode).toBe(200);
		expect(response.body.response.code).toBe("1");
		expect(response.body.response.name).toBe("Room");
	});
});