import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as VerifyUserEmail } from "./Rules";

export const verifyUserEmail = new VerifyUserEmail(userRepository);