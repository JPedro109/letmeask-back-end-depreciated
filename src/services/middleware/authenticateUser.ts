import { SECRET_KEY_JWT } from "../../config";
import { IRequestMiddleware } from "../../core/adapter/interfaces/IRequestMiddleware";
import { UnauthorizedError } from "../../utils/error";
import { toolkit } from "../../utils/toolkit";

export const authenticateUser = async (request: IRequestMiddleware) => {

	const { authorization } = request.headers;

	if (!authorization) throw new UnauthorizedError("Você não está logado");

	const [, token] = authorization.split(" ");

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const decode: any = toolkit.jsonWebToken.tokenVerification(token, SECRET_KEY_JWT);

	return decode.id;
};