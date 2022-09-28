import { InvalidParamError, MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId, email, token }: DTO) {
		if (!email || !token) throw new MissingParamError("Preencha todos os campos");

		const userToken = await this.repository.getVerificationTokenById(userId);

		if (token !== userToken) throw new InvalidParamError("Token Inválido");

		const tokenExpiryTime = await this.repository.getVerificationTokenExpiryDateById(userId);

		if (Date.now() > tokenExpiryTime) throw new InvalidParamError("Link expirado, recomece o processo");

		await this.repository.updateEmail(userId, email);

		await this.repository.updateVerificationTokenExpiryDateById(userId, 0);

		return "Email atualizado com sucesso";
	}
}