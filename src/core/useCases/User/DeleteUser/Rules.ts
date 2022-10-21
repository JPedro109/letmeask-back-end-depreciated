import { InvalidParamError, MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId, password, passwordConfirm }: DTO) {

		if (!password || !passwordConfirm) throw new MissingParamError("Preencha todos os campos");

		const userPassword = await this.repository.getPasswordById(userId);

		const comparePassword = toolkit.password.comparePasswordEncrypt(password, userPassword);

		if (!comparePassword) throw new InvalidParamError("Senha incorreta");

		toolkit.cache.del(`username-${userId}`);

		await this.repository.destroy(userId);

		return userId;
	}
}