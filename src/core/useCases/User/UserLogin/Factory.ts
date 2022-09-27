import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as UserLogin } from "./Rules";

export const userLogin = new UserLogin(userRepository);