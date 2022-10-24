import { setup } from "../setup";
import { Rules as GetUsername } from "../../../core/useCases/User/GetUsername/Rules";
import { userRepositoryInMemory } from "../Mock";

describe("Unit Test - Get Username", () => {

	setup();

	test("Should get user name", async () => {
		const getUseraname = new GetUsername(userRepositoryInMemory);
		const user = {
			userId: "1",
		};

		const response = await getUseraname.execute(user);
		expect(response).toBe("João");
	});
});