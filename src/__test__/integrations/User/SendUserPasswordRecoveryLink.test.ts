import { setup } from "../setup";
import { Rules as SendUserPasswordRecoveryLink } from "../../../core/useCases/User/SendUserPasswordRecoveryLink/Rules";
import { MissingParamError, InvalidParamError } from "../../../utils/error";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - Send User Password Recover Link", () => {

	setup();

	test("Should not send the recovery password email, because the email field is empty", async () => {
		const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLink(userRepository);

		const user = {
			email: ""
		};
		await sendUserPasswordRecoveryLink.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not send the recovery password email, because the email is not registered", async () => {
		const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLink(userRepository);

		const user = {
			email: "emaifISNOTEXISTS@test.com"
		};
		await sendUserPasswordRecoveryLink.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should send the recovery password email", async () => {
		const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLink(userRepository);

		const user = {
			email: "emailVERIFIED@test.com"
		};
		const response = await sendUserPasswordRecoveryLink.execute(user);
		expect(response).toBe(user.email);
	});
});