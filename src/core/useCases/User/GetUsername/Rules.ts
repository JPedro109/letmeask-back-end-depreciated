import { IUserRepository } from "../../../../data/repositories/UserRepository/IUserRepository";
import { toolkit } from "../../../../utils/toolkit";
import { DTO } from "./DTO";

export class Rules {

	constructor(private repository: IUserRepository) { }

	async execute({ userId }: DTO) {
		const name = toolkit.cache.get(`username-${userId}`);

		if (name === undefined) {
			const repositoryName = await this.repository.getName(userId);

			toolkit.cache.set(
				`username-${userId}`,
				repositoryName,
			);

			return repositoryName;
		}

		return name;

	}
}