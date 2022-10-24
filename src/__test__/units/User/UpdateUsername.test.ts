import { setup } from "../setup";
import { Rules as UpdateUsername } from "../../../core/useCases/User/UpdateUsername/Rules";
import { userRepositoryInMemory } from "../Mock";
import { MissingParamError } from "../../../utils/error";

describe("Unit Test - Update Username", () => {

	setup();

	test("Should not update username, because name field is empty", async () => {
		const getUseraname = new UpdateUsername(userRepositoryInMemory);
		const user = {
			userId: "1",
			name: ""
		};

		await getUseraname.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should update username", async () => {
		const getUseraname = new UpdateUsername(userRepositoryInMemory);
		const user = {
			userId: "1",
			name: "Pedro"
		};

		const response = await getUseraname.execute(user);
		expect(response).toBe("Pedro");
	});
});