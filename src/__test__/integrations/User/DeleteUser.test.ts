import { setup } from "../setup";
import { Rules as DeleteUser } from "../../../core/useCases/User/DeleteUser/Rules";
import { InvalidParamError, MissingParamError, NotFoundError } from "../../../utils/error";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - Delete User", () => {

	setup();

	test("Should not delete user, because the password field is empty", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "",
			passwordConfirm: "Password1234",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not delete user, because the password confirm field is empty", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "Password1234",
			passwordConfirm: "",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not delete user, because password and password fields are empty", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "",
			passwordConfirm: "",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not delete user, because the password is not match", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "Password12345",
			passwordConfirm: "Password1234",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not delete user, because the password is incorrect", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "Password123456",
			passwordConfirm: "Password123456",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not delete user, because user is not exists", async () => {
		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "6",
			password: "Password123456",
			passwordConfirm: "Password123456",
		};
		await deleteUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(NotFoundError);
		});
	});

	test("Should delete user", async () => {

		const deleteUserRules = new DeleteUser(userRepository);

		const user = {
			userId: "1",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		const response = await deleteUserRules.execute(user);

		expect(response).toBe("1");
	});
});