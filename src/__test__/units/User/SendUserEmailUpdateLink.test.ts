import { setup } from "../setup";
import { Rules as SendUserEmailUpdateLink } from "../../../core/useCases/User/SendUserEmailUpdateLink/Rules";
import { MissingParamError, InvalidParamError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";
import { toolkit } from "../../../utils/toolkit";

describe("Unit Test - Send User Email Update Link", () => {

	setup();

	test("Should not send email update link, because the email field is empty", async () => {
		const sendUserEmailUpdateLink = new SendUserEmailUpdateLink(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: ""
		};
		await sendUserEmailUpdateLink.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not send email update link, because the email alredy was registered", async () => {
		const sendUserEmailUpdateLink = new SendUserEmailUpdateLink(userRepositoryInMemory);

		const user = {
			userId: "1",
			email: "emailISNOTVERIFIED@test.com"
		};
		await sendUserEmailUpdateLink.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should send email update link", async () => {
		const sendUserEmailUpdateLink = new SendUserEmailUpdateLink(userRepositoryInMemory);

		toolkit.email.sendMail = jest.fn();

		const user = {
			userId: "1",
			email: "email@test.com"
		};
		const email = await sendUserEmailUpdateLink.execute(user);
		expect(email).toBe(user.email);
	});
});