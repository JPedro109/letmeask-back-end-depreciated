import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as SendUserEmailUpdateLink } from "./Rules";

export const sendUserEmailUpdateLink = new SendUserEmailUpdateLink(userRepository);