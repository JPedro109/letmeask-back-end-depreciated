import { APP_URL } from "../../config";
import { UnauthorizedError } from "../../utils/error";
import corsLib from "cors";

const corsOptions = {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	origin: (origin: any, callback: any) => {

		if (APP_URL.indexOf(origin) !== -1) return callback(null, true);

		callback(new UnauthorizedError("O cors não permite essa requisição"));

	}
};

export const cors = corsLib(corsOptions);