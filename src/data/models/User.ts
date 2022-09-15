class User {
	readonly id: string;
	email: string;
	name: string;
	password: string;
	admin?: string;
	verified_email?: boolean;
	verification_token: string;
	verification_token_expiry_time?: number;
	created_at?: Date;
	updated_at?: Date;
}

export { User };