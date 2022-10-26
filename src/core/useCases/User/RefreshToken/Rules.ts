import { JsonWebTokenModel } from "../../../../utils/model";
import { MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ refreshToken }: DTO) {
		if (!refreshToken) throw new MissingParamError("O refresh token precisa ser enviado");

		const decode: JsonWebTokenModel = toolkit.jsonWebToken.tokenVerification(refreshToken);

		const email = decode.email as string;

		const id = await this.repository.getId(email);

		const accessToken = toolkit.jsonWebToken.createToken({ id, email }, 3600);

		return accessToken;
	}
}