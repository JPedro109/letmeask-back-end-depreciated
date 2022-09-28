import { Request, Response, NextFunction } from "express";
import { IRequestMiddleware } from "../interfaces/IRequestMiddleware";

export const adapterMiddleware = (middleware: (request: IRequestMiddleware) => Promise<string | void>) => {

	return async (req: Request, res: Response, next: NextFunction) => {

		try {
			const response = await middleware({
				headers: req.headers,
				params: req.params
			});

			if (response) req.userId = response;

			return next();
		} catch (e) {
			const message = e?.message;
			const statusCode = e?.statusCode || 500;

			console.error(message);
			return res.status(statusCode).json({ message: statusCode !== 500 ? message : "Internal Server Error" });
		}
	};
};