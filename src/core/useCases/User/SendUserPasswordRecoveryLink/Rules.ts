import { APP_URL, TOKEN_EXPIRY_TIME } from "../../../../config";
import { InvalidParamError, MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ email }: DTO) {

		if (!email) throw new MissingParamError("Preencha o campo email");

		const emailIsRegistered = await this.repository.findEmailByEmail(email);

		if (!emailIsRegistered) throw new InvalidParamError("Email não cadastrado");

		const token = toolkit.generation.token();
		const tokenExpirationTime = toolkit.generation.tokenExpirationTime(parseInt(TOKEN_EXPIRY_TIME));

		await this.repository.updateVerificationTokenByEmail(email, token);
		await this.repository.updateVerificationTokenExpiryDateByEmail(email, tokenExpirationTime);

		await toolkit.email.sendMail(email, "Recuperação de Senha", "recoverPassword", {
			appUrl: APP_URL,
			email: email,
			token: token
		});

		return "O link de recuperação de senha foi enviado para seu email, ele é válido por alguns minutos, não esqueça de verificar sua caixa de spam";

	}
}