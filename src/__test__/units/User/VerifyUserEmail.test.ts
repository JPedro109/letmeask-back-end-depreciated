import { setup } from "../setup";
import { Rules as VerifyUserEmail  } from "../../../core/useCases/User/VerifyUserEmail/Rules";
import { InvalidParamError, MissingParamError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";

describe("Unit Test - Verify Email User", () => {

	setup();

	test("Should not verify email, because the email field is empty", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "",
			token: "token"
		};
		await verifyUserEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not verify email, because the token field is empty", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "emailVERIFIED@test.com",
			token: ""
		};
		await verifyUserEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not verify email, because all fields are empty", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "",
			token: ""
		};
		await verifyUserEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not verify email, because the email alredy was verified", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "emailVERIFIED@test.com",
			token: "token"
		};
		await verifyUserEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not verify email, because the token is incorrect", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "emailISNOTVERIFIED@test.com",
			token: "token-incorrect"
		};
		await verifyUserEmailRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should the verify email", async () => {
		const verifyUserEmailRules = new VerifyUserEmail(userRepositoryInMemory);

		const user = {
			email: "emailISNOTVERIFIED@test.com",
			token: "token"
		};
		const response = await verifyUserEmailRules.execute(user);
		expect(response).toBe(user.email);
	});
});