import { IUserRepository } from "./IUserRepository";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { User } from "../../models/User";

export class UserRepository implements IUserRepository {

	constructor(private adapter: IDBAdapter) { }

	async store(id: string, email: string, name: string, hashPassword: string, token: string): Promise<void> {
		await this.adapter.setEntity("user").insert<User>({
			id,
			email,
			name,
			verification_token: token,
			password: hashPassword
		});
	}

	async verifyEmail(email: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>(
			{ email },
			{ verified_email: true }
		);
	}

	async updateName(id: string, name: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>(
			{ id },
			{ name }
		);
	}

	async destroy(id: string): Promise<void> {
		await this.adapter.setEntity("user").delete<User>({ id });
	}

	async findEmailById(id: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ id });

		return data?.email;
	}

	async findEmailByEmail(email: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email, verified_email: true }, "AND");

		return data?.email;
	}

	async findByEmailVerified(email: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email, verified_email: true }, "AND");

		return data?.email;
	}

	async getId(email: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email });

		return data?.id;
	}

	async getName(id: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ id });

		return data?.name;
	}

	async getPasswordByEmail(email: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email });

		return data?.password;
	}

	async getPasswordById(id: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ id });

		return data?.password;
	}

	async getVerificationTokenById(id: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ id });

		return data?.verification_token;
	}

	async getVerificationTokenByEmail(email: string): Promise<string> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email });

		return data?.verification_token;
	}

	async updateVerificationTokenById(id: string, verificationToken: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ id }, { verification_token: verificationToken });
	}

	async updateVerificationTokenByEmail(email: string, verificationToken: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ email }, { verification_token: verificationToken });
	}

	async getVerificationTokenExpiryDateById(id: string): Promise<number> {
		const data = await this.adapter.setEntity("user").getOne<User>({ id });

		return data?.verification_token_expiry_time;
	}

	async getVerificationTokenExpiryDateByEmail(email: string): Promise<number> {
		const data = await this.adapter.setEntity("user").getOne<User>({ email });

		return data?.verification_token_expiry_time;
	}

	async updateVerificationTokenExpiryDateById(id: string, verificationTokenExpiryDate: number): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ id }, { verification_token_expiry_time: verificationTokenExpiryDate });
	}

	async updateVerificationTokenExpiryDateByEmail(email: string, verificationTokenExpiryDate: number): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ email }, { verification_token_expiry_time: verificationTokenExpiryDate });
	}

	async updateEmail(id: string, email: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ id }, { email });
	}

	async updatePasswordById(id: string, password: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ id }, { password });
	}

	async updatePasswordByEmail(email: string, password: string): Promise<void> {
		await this.adapter.setEntity("user").update<User>({ email }, { password });
	}
}