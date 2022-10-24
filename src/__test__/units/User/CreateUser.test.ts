import { setup } from "../setup";
import { Rules as CreateUser } from "../../../core/useCases/User/CreateUser/Rules";
import { InvalidParamError, MissingParamError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";
import { toolkit } from "../../../utils/toolkit";

describe("Unit Test - Create User", () => {

	setup();

	test("Should not create the user, because the email field is empty", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "",
			password: "Password1234",
			name: "João",
			passwordConfirm: "Password1234",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create the user, because the name field is empty", async() => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "email@test.com",
			name: "",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create the user, because the password field is empty", async() => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "email@test.com",
			name: "João",
			password: "",
			passwordConfirm: "Password1234",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create the user, because the password confirm field is empty", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "email@test.com",
			name: "João",
			password: "Password1234",
			passwordConfirm: "",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create the user, because all fields is empty", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "",
			name: "",
			password: "",
			passwordConfirm: "",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(MissingParamError);
		});
	});

	test("Should not create the user, because the email already was registered", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);
        
		const user = {
			email: "emailVERIFIED@test.com",
			name: "João",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should not create the user, because the passwords is not match", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);

		const user = {
			email: "email@test.com",
			name: "João",
			password: "Password1234",
			passwordConfirm: "Password12345",
		};
		await createUserRules.execute(user).catch(e => {
			expect(e).toBeInstanceOf(InvalidParamError);
		});
	});

	test("Should create the user", async () => {
		const createUserRules = new CreateUser(userRepositoryInMemory);
		
		const user = {
			email: "email@test.com",
			name: "João",
			password: "Password1234",
			passwordConfirm: "Password1234",
		};

		toolkit.email.sendMail = jest.fn();

		const response = await createUserRules.execute(user);
		expect(response).toBe(user.email);
	});
});