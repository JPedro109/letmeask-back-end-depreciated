import { Response } from "../../models/Response";
import { IDBAdapter } from "../../adapter/IDBAdapter";
import { IResponseRepository } from "./IResponseRepository";

export class ResponseRepository implements IResponseRepository {

	constructor(private adapter: IDBAdapter<Response>) { }

	async store(id: string, questionId: string, response: string): Promise<Response> {
		return await this.adapter.insert({
			id,
			question_id: questionId,
			response
		});
	}
}