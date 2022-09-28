import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as SendUserPasswordRecoveryLink } from "./Rules";

export const sendUserPasswordRecoveryLink = new SendUserPasswordRecoveryLink(userRepository);