import { Response } from "../../models/Response";
import { DBAdapter } from "../../adapter/DBAdapter";
import { ResponseRepository } from "./ResponseRepository";

const adapter = new DBAdapter<Response>("response");
export const responseRepository = new ResponseRepository(adapter);