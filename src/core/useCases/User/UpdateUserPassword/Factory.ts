import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as UpdateUserPassword } from "./Rules";

export const updateUserPassword = new UpdateUserPassword(userRepository);