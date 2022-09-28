import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as RecoverUserPassword } from "./Rules";

export const recoverUserPassword = new RecoverUserPassword(userRepository);