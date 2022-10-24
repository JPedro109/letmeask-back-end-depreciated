import { setup } from "../setup";
import { Rules as UpdateUserEmail } from "../../../core/useCases/User/UpdateUserEmail/Rules";
import { MissingParamError, InvalidParamError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";

describe("Unit Test - Update User Email", () => {

	setup();

	test("Should not update email, because the email field is empty", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "",
			token: "token"
		};
		await updateUserEmail.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update email, because the verification token field is empty", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "email@test.com",
			token: ""
		};
		await updateUserEmail.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update email, because the fields email and token are empty", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "",
			token: ""
		};
		await updateUserEmail.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update email, because the verification token is incorrect", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "email@test.com",
			token: "token-incorrect"
		};
		await updateUserEmail.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not update email, because the update email link was expired", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "3",
			email: "email@test.com",
			token: "token"
		};
		await updateUserEmail.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should update email", async () => {
		const updateUserEmail = new UpdateUserEmail(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "email@test.com",
			token: "token"
		};
		const response = await updateUserEmail.execute(user);
		expect(response).toBe(user.email);
	});
});