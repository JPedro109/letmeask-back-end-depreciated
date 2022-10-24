import { setup } from "../setup";
import { Rules as GetUsername } from "../../../core/useCases/User/GetUsername/Rules";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - Get Username", () => {

	setup();

	test("Should get user name", async () => {
		const getUseraname = new GetUsername(userRepository);
		const user = {
			userId: "1",
		};

		const response = await getUseraname.execute(user);
		expect(response).toBe("João");
	});
});