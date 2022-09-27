import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as CreateUser } from "./Rules";

export const createUser = new CreateUser(userRepository);