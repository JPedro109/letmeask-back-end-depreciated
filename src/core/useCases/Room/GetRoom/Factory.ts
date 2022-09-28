import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as GetRoom } from "./Rules";

export const getRoom = new GetRoom(roomRepository);