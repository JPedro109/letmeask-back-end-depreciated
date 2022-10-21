import { Request, Response } from "express";
import { IRequestRouters } from "../interfaces/IRequestRouters";
import { IResponse } from "../interfaces/IResponse";

export const adapterRouter = (router: (request: IRequestRouters) => Promise<IResponse>) => {

	return async (req: Request, res: Response) => {

		try {
			const { response, statusCode } = await router({
				body: req.body,
				query: req.query,
				params: req.params,
				userId: req.userId
			});

			return res.status(statusCode).json({ response });
		} catch (e) {
			const message = e?.message;
			const statusCode = e?.statusCode || 500;
			const code = e?.name;

			console.error(message);
			return res.status(statusCode).json({ message: statusCode !== 500 ? message : "Internal Server Error", code });
		}
	};
};