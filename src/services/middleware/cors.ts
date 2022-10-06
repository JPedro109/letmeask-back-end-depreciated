import { APP_URL, API_URL, ENVIRONMENT } from "../../config";
import { UnauthorizedError } from "../../utils/error";
import corsLib from "cors";

const allowList = [ API_URL, APP_URL];

const corsOptions = {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	origin: (origin: string, callback: any) => {

		if(ENVIRONMENT === "DEV") return callback(null, true);

		if (allowList.indexOf(origin) !== -1) return callback(null, true);

		callback(new UnauthorizedError("Not allowed cors"));

	}
};

export const cors = corsLib(corsOptions);