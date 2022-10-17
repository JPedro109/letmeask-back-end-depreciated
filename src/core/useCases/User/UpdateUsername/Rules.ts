import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { MissingParamError } from "../../../../utils/error";
import { DTO } from "./DTO";
import { toolkit } from "../../../../utils/toolkit";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId, name }: DTO) {
		if (!name) throw new MissingParamError("Preencha o seu novo nome");

		await this.repository.updateName(userId, name);

		toolkit.cache.set(`username-${userId}`, name);

		return name;
	}
}