import { IDBAdapter } from "../../adapter/IDBAdapter";
import { User } from "../../models/User";
import { Room } from "../../models/Room";
import { Question } from "../../models/Question";
import { Response } from "../../models/Response";

export class MockRepository {

	constructor(private database: IDBAdapter) { }

	async create() {
		await this.database.insert<User>({
			id: "1",
			email: "emailVERIFIED@test.com",
			name: "João",
			password: "$2a$10$6tMxx4/gMoOKQjDjpbzJq.i7/paapFWABI7I5cC4Fw2ILxF4WKaT2",
			verification_token: "token",
			verified_email: true,
			verification_token_expiry_time: 163339098051211
		}, "user");

		await this.database.insert<User>({
			id: "2",
			email: "emailISNOTVERIFIED@test.com",
			name: "João Pedro",
			password: "$2a$10$6tMxx4/gMoOKQjDjpbzJq.i7/paapFWABI7I5cC4Fw2ILxF4WKaT2",
			verification_token: "token",
			verified_email: false,
			verification_token_expiry_time: 163339098051211
		}, "user");

		await this.database.insert<User>({
			id: "3",
			name: "Pedro",
			email: "emailWITHTOKENEXPIRED@test.com",
			password: "$2a$10$6tMxx4/gMoOKQjDjpbzJq.i7/paapFWABI7I5cC4Fw2ILxF4WKaT2",
			verification_token: "544f818f5f5cd4cde44c611683fc71",
			verified_email: true,
			verification_token_expiry_time: 0
		}, "user");

		await this.database.insert<Room>({
			id: "1",
			user_id: "1",
			code: "1",
			name: "Room",
			created_at: new Date(),
			updated_at: new Date(),
		}, "room");

		await this.database.insert<Question>({
			id: "1",
			question: "Question?",
			room_code: "1",
			user_id: "2",
			created_at: new Date(),
			updated_at: new Date(),
		}, "question");

		await this.database.insert<Response>({
			id: "1",
			question_id: "1",
			response: "Response",
			created_at: new Date(),
		}, "response");
	}

	async delete(){
		await this.database.deleteMany("response");
		await this.database.deleteMany("question");
		await this.database.deleteMany("room");
		await this.database.deleteMany("user");
	}
}