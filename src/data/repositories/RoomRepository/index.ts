import { dbAdapter } from "../../adapter";
import { RoomRepository } from "./RoomRepository";

export const roomRepository = new RoomRepository(dbAdapter);