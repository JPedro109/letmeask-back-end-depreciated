import { setup } from "../setup";
import { Rules as UpdateUserPassword } from "../../../core/useCases/User/UpdateUserPassword/Rules";
import { MissingParamError, InvalidParamError, PasswordInvalidError } from "../../../utils/error";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - Update User Password", () => {

	setup();

	test("Should not update password, because the current password field is empty", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update password, because the password is empty", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password1234",
			password: "",
			passwordConfirm: "Password12345",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update password, because the password confirm field is empty", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update password, because all passwords fields are empty", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "",
			password: "",
			passwordConfirm: "",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not update password, because the new password is not respect rules", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password1234",
			password: "pass1",
			passwordConfirm: "pass1",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(PasswordInvalidError);
		});
	});

	test("Should not update password, because the passwords is not match", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "Password123456",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not update password, because the current password is not correct", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password123456",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		await updateUserPasswordRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should update password", async () => {
		const updateUserPasswordRules = new UpdateUserPassword(userRepository);

		const user = {
			userId: "1",
			passwordCurrent: "Password1234",
			password: "Password12345",
			passwordConfirm: "Password12345",
		};
		const respone = await updateUserPasswordRules.execute(user);
		expect(respone).toBe("1");
	});
});