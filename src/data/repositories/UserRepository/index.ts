import { dbAdapter } from "../../adapter";
import { UserRepository } from "./UserRepository";

export const userRepository = new UserRepository(dbAdapter);