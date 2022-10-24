import { setup } from "../setup";
import { Rules as UserLogin  } from "../../../core/useCases/User/UserLogin/Rules";
import { UnauthorizedError, MissingParamError } from "../../../utils/error";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - User Login", () => {

	setup();

	test("Should not return the token, because the email field is empty", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "",
			password: "Password1234"
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not return the token, because the password field is empty", async () => {
		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "emailVERIFIED@test.com",
			password: ""
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not return the token, because all fields are empty", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "",
			password: ""
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not return the token, because the email is incorrect", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "emailISNOTEXISTS@test.com",
			password: "Password1234"
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});

	});

	test("Should not return the token, because the password is incorrect", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password12345"
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});

	});

	test("Should not return the token, because the email was not verified", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "emailISNOTVERIFIED@test.com",
			password: "Password1234"
		};
		await userLoginEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});

	});

	test("Should return the token", async () => {

		const userLoginEmailRules = new UserLogin(userRepository);

		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234"
		};
		const response = await userLoginEmailRules.execute(user);
		expect(response.accessToken).not.toBeUndefined();
		expect(response.refreshToken).not.toBeUndefined();
	});
});