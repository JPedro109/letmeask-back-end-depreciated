import { setup } from "../setup";
import { Rules as RefreshToken } from "../../../core/useCases/User/RefreshToken/Rules";
import { Rules as UserLogin } from "../../../core/useCases/User/UserLogin/Rules";
import { UnauthorizedError } from "../../../utils/error";
import { userRepositoryInMemory } from "../Mock";

describe("Unit Test - Refresh Token", () => {

	setup();

	test("Should not return the token, because the refresh is invalid", async () => {
		const refreshToken = new RefreshToken(userRepositoryInMemory);
		const user = {
			refreshToken: "invalid",
		};

		refreshToken.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should return the token", async () => {
		const refreshToken = new RefreshToken(userRepositoryInMemory);
		const userLogin = new UserLogin(userRepositoryInMemory);

		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234"
		};
		refreshToken.execute({ refreshToken: (await userLogin.execute(user)).refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});
});