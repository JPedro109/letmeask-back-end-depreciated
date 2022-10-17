import { InvalidParamError, MissingParamError, PasswordInvalidError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ email, password, passwordConfirm, token }: DTO) {
		if (!password || !passwordConfirm || !email || !token) throw new MissingParamError("Preencha todos os campos");

		const userToken = await this.repository.getVerificationTokenByEmail(email);

		if (token !== userToken) throw new InvalidParamError("Token inválido");

		const tokenExpiryTime = await this.repository.getVerificationTokenExpiryDateByEmail(email);

		if (Date.now() > tokenExpiryTime) throw new InvalidParamError("Link expirado, recomece o processo");

		const userPassword = await this.repository.getPasswordByEmail(email);

		const passwordCompare = toolkit.password.comparePasswordEncrypt(password, userPassword);

		if (passwordCompare) throw new InvalidParamError("A sua nova senha não pode ser igual a anterior");

		const passwordIsValid = toolkit.validation.password(password);

		if (!passwordIsValid) throw new PasswordInvalidError();

		if (password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const hashPassword = toolkit.password.encryptPassword(password);

		await this.repository.updatePasswordByEmail(email, hashPassword);

		await this.repository.updateVerificationTokenExpiryDateByEmail(email, 0);

		return email;
	}
}