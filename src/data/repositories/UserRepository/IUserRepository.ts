export interface IUserRepository {
	store(id: string, email: string, name: string, hashPassword: string, token: string): Promise<void>;
	verifyEmail(email: string): Promise<void>;
	updateName(id: string, name: string): Promise<void>;
	destroy(id: string): Promise<void>;
	findEmailById(id: string): Promise<string>;
	findEmailByEmail(email: string): Promise<string>;
	findByEmailVerified(email: string): Promise<string>
	getId(email: string): Promise<string>;
	getName(ud: string): Promise<string>;
	getPasswordByEmail(email: string): Promise<string>;
	getPasswordById(id: string): Promise<string>;
	getVerificationTokenById(id: string): Promise<string>;
	getVerificationTokenByEmail(email: string): Promise<string>;
	updateVerificationTokenById(id: string, verificationToken: string): Promise<void>;
	updateVerificationTokenByEmail(email: string, verificationToken: string): Promise<void>;
	getVerificationTokenExpiryDateById(id: string): Promise<number>;
	getVerificationTokenExpiryDateByEmail(email: string): Promise<number>;
	updateVerificationTokenExpiryDateById(id: string, verificationTokenExpiryDate: number): Promise<void>;
	updateVerificationTokenExpiryDateByEmail(email: string, verificationTokenExpiryDate: number): Promise<void>;
	updateEmail(id: string, email: string): Promise<void>;
	updatePasswordById(id: string, password: string): Promise<void>;
	updatePasswordByEmail(email: string, password: string): Promise<void>;
}