import { Router } from "express";

import { adapterRouter } from "../../core/adapter/adapterRouter";
import { adapterMiddleware } from "../../core/adapter/adapterMiddleware";

import { authenticateUser } from "../middleware/authenticateUser";

import CreateRoomController from "../../core/useCases/Room/CreateRoom/Controller";
import DeleteRoomController from "../../core/useCases/Room/DeleteRoom/Controller";
import GetRoomController from "../../core/useCases/Room/GetRoom/Controller";
import GetUserRoomCodeController from "../../core/useCases/Room/GetUserRoom/Controller";

const router = Router();

router.post("/room", adapterMiddleware(authenticateUser), adapterRouter(CreateRoomController.handle));
router.delete("/room/:roomCode", adapterMiddleware(authenticateUser), adapterRouter(DeleteRoomController.handle));
router.get("/room/:roomCode", adapterMiddleware(authenticateUser), adapterRouter(GetRoomController.handle));
router.get("/room-code", adapterMiddleware(authenticateUser), adapterRouter(GetUserRoomCodeController.handle));

export default router;