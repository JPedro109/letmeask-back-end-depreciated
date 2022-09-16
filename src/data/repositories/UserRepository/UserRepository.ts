import { IUserRepository } from "./IUserRepository";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { User } from "../../models/User";

export class UserRepository implements IUserRepository {

	constructor(private adapter: IDBAdapter<User>) { }

	async store(id: string, email: string, name: string, hashPassword: string, token: string): Promise<void> {
		await this.adapter.insert({
			id,
			email,
			name,
			verification_token: token,
			password: hashPassword
		});
	}

	async verifyEmail(email: string, token: string): Promise<void> {
		await this.adapter.update(
			{ email, verification_token: token },
			{ email_verified: true }
		);
	}

	async updateName(id: string, name: string): Promise<void> {
		await this.adapter.update(
			{ id },
			{ name }
		);
	}

	async destroy(id: string): Promise<void> {
		await this.adapter.delete({ id });
	}

	async findEmailById(id: string): Promise<string> {
		const data = await this.adapter.getOne({ id });

		return data?.email;
	}

	async findEmailByEmail(email: string): Promise<string> {
		const data = await this.adapter.getOne({ email, email_verified: true });

		return data?.email;
	}

	async findByEmailVerified(email: string): Promise<string> {
		const data = await this.adapter.getOne({ email });

		return data?.email;
	}

	async getId(email: string): Promise<string> {
		const data = await this.adapter.getOne({ email });

		return data?.id;
	}

	async getPasswordByEmail(email: string): Promise<string> {
		const data = await this.adapter.getOne({ email });

		return data?.password;
	}

	async getPasswordById(id: string): Promise<string> {
		const data = await this.adapter.getOne({ id });

		return data?.id;
	}

	async getVerificationTokenById(id: string): Promise<string> {
		const data = await this.adapter.getOne({ id });

		return data?.verification_token;
	}

	async getVerificationTokenByEmail(email: string): Promise<string> {
		const data = await this.adapter.getOne({ email });

		return data?.verification_token;
	}

	async updateVerificationTokenById(id: string, verificationToken: string): Promise<void> {
		await this.adapter.update({ id }, { verification_token: verificationToken });
	}

	async updateVerificationTokenByEmail(email: string, verificationToken: string): Promise<void> {
		await this.adapter.update({ email }, { verification_token: verificationToken });
	}

	async getVerificationTokenExpiryDateById(id: string): Promise<number> {
		const data = await this.adapter.getOne({ id });

		return data?.verification_token_expiry_time;
	}

	async getVerificationTokenExpiryDateByEmail(email: string): Promise<number> {
		const data = await this.adapter.getOne({ email });

		return data?.verification_token_expiry_time;
	}

	async updateVerificationTokenExpiryDateById(id: string, verificationTokenExpiryDate: number): Promise<void> {
		await this.adapter.update({ id }, { verification_token_expiry_time: verificationTokenExpiryDate });
	}

	async updateVerificationTokenExpiryDateByEmail(email: string, verificationTokenExpiryDate: number): Promise<void> {
		await this.adapter.update({ email }, { verification_token_expiry_time: verificationTokenExpiryDate });
	}

	async updateEmail(id: string, email: string): Promise<void> {
		await this.adapter.update({ id }, { email });
	}

	async updatePasswordById(id: string, password: string): Promise<void> {
		await this.adapter.update({ id }, { password });
	}

	async updatePasswordByEmail(email: string, password: string): Promise<void> {
		await this.adapter.update({ email }, { password });
	}
}