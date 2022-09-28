import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as GetUserRoom } from "./Rules";

export const getUserRoom = new GetUserRoom(roomRepository);