import { roomRepository } from "../../../../data/repositories/RoomRepository";
import { Rules as DeleteRoom } from "./Rules";

export const deleteRoom = new DeleteRoom(roomRepository);