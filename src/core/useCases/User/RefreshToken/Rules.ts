import { SECRET_KEY_JWT } from "../../../../config";
import { MissingParamError } from "../../../../utils/error";
import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ refreshToken }: DTO) {
		if (!refreshToken) throw new MissingParamError("O refresh token precisa ser enviado");

		// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		const decode: any = toolkit.jsonWebToken.tokenVerification(refreshToken, SECRET_KEY_JWT);

		const email = decode?.email;

		const id = await this.repository.getId(email);

		const accessToken = toolkit.jsonWebToken.createToken({ id, email }, SECRET_KEY_JWT, 3600);

		return accessToken;
	}
}