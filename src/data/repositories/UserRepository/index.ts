import { User } from "../../models/User";
import { DBAdapter } from "../../adapter/DBAdapter";
import { UserRepository } from "./UserRepository";

const adapter = new DBAdapter<User>("user");
export const userRepository = new UserRepository(adapter);