import { APP_URL } from "../../../../config";
import { InvalidParamError, MissingParamError, PasswordInvalidError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ email, name, password, passwordConfirm }: DTO) {

		if (!email || !name || !password || !passwordConfirm) throw new MissingParamError("Preencha todos os campos");

		if (await this.repository.findEmailByEmail(email)) throw new InvalidParamError("Email já cadastrado");

		const passwordIsValid = toolkit.validation.password(password);

		if (!passwordIsValid) throw new PasswordInvalidError();

		if (password !== passwordConfirm) throw new InvalidParamError("As senhas não coincidem");

		const id = toolkit.generation.id();

		const token = toolkit.generation.token();

		const hashPassword = toolkit.password.encryptPassword(password);

		await this.repository.store(id, email, name, hashPassword, token);

		await toolkit.email.sendMail(email, "Validação de Email", "createUser", {
			appUrl: APP_URL,
			email: email,
			token: token
		});

		return "Usuário cadastrado com sucesso, verique seu email, não esqueça de verificar sua caixa de spam";
	}
}