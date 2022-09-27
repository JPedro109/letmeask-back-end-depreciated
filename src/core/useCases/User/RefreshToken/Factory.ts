import { userRepository } from "../../../../data/repositories/UserRepository";
import { Rules as RefreshToken } from "./Rules";

export const refreshToken = new RefreshToken(userRepository);