import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as GetUsername } from "./Rules";

export const getUsername = new GetUsername(userRepository);