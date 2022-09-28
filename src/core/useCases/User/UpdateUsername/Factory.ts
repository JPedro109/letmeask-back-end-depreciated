import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as UpdateUsername } from "./Rules";

export const updateUsername = new UpdateUsername(userRepository);