import { setup } from "../setup";
import { Rules as RefreshToken } from "../../../core/useCases/User/RefreshToken/Rules";
import { Rules as UserLogin } from "../../../core/useCases/User/UserLogin/Rules";
import { UnauthorizedError } from "../../../utils/error";
import { userRepository } from "../../../data/repositories/UserRepository";

describe("Integration Test - Refresh Token", () => {

	setup();

	test("Should not return the token, because the refresh is invalid", async () => {
		const refreshToken = new RefreshToken(userRepository);
		const user = {
			refreshToken: "invalid",
		};

		refreshToken.execute(user).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});

	test("Should return the token", async () => {
		const refreshToken = new RefreshToken(userRepository);
		const userLogin = new UserLogin(userRepository);

		const user = {
			email: "emailVERIFIED@test.com",
			password: "Password1234"
		};
		refreshToken.execute({ refreshToken: (await userLogin.execute(user)).refreshToken }).catch(e => {
			expect(e).toBeInstanceOf(UnauthorizedError);
		});
	});
});