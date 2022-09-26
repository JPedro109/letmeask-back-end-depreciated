import { Response } from "../../models/Response";

export interface IResponseRepository {
	store(id: string, questionId: string, response: string): Promise<Response>;
	getResponse(questionId: string): Promise<Response>;
}