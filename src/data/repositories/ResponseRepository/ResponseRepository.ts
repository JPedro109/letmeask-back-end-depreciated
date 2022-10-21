import { Response } from "../../models/Response";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IResponseRepository } from "./IResponseRepository";

export class ResponseRepository implements IResponseRepository {

	constructor(private adapter: IDBAdapter) { }

	async store(id: string, questionId: string, response: string): Promise<Response> {
		return await this.adapter.setEntity("response").insert<Response>({
			id,
			question_id: questionId,
			response
		});
	}

	async getResponse(questionId: string): Promise<Response> {
		return await this.adapter.setEntity("response").getOne<Response>({ question_id: questionId });
	}
}