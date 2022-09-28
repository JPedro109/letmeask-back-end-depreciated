import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as CreateRoom } from "./Rules";

export const createRoom = new CreateRoom(roomRepository);