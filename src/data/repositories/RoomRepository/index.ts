import { DBAdapter } from "../../adapter/DBAdapter";
import { Room } from "../../models/Room";
import { RoomRepository } from "./RoomRepository";

const adapter = new DBAdapter<Room>("room");
export const roomRepository = new RoomRepository(adapter);