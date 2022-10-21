import { dbAdapter } from "../../adapter";
import { ResponseRepository } from "./ResponseRepository";

export const responseRepository = new ResponseRepository(dbAdapter);