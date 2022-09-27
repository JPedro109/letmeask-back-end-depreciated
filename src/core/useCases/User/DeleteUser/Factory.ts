import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as DeleteUser } from "./Rules";

export const deleteUser = new DeleteUser(userRepository);