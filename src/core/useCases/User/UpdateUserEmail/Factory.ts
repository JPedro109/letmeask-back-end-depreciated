import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as UpdateUserEmail } from "./Rules";

export const updateUserEmail = new UpdateUserEmail(userRepository); 