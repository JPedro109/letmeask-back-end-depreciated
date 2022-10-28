import { APP_URL, TOKEN_EXPIRY_TIME } from "../../../../config";
import { InvalidParamError, MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId, email }: DTO) {
		if (!email) throw new MissingParamError("Preencha o campo email");

		const emailIsRegistered = await this.repository.findEmailByEmail(email);

		if (emailIsRegistered) throw new InvalidParamError("Email já cadastrado");

		const token = toolkit.generation.token();
		const tokenExpirationTime = toolkit.generation.tokenExpirationTime(TOKEN_EXPIRY_TIME);

		await this.repository.updateVerificationTokenById(userId, token);
		await this.repository.updateVerificationTokenExpiryDateById(userId, tokenExpirationTime);

		await toolkit.email.sendMail(email, "Atualização de Email", "updateUser", {
			appUrl: APP_URL,
			email: email,
			token: token
		});

		return email;
	}
}