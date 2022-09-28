import { Router } from "express";

import { adapterRouter } from "../../core/adapter/adapterRouter";
import { adapterMiddleware } from "../../core/adapter/adapterMiddleware";

import { authenticateUser } from "../middleware/authenticateUser";

import CreateResponseController from "../../core/useCases/Response/CreateResponse/Controller";

const router = Router();

router.post(
	"/response/:roomCode/:questionId",
	adapterMiddleware(authenticateUser),
	adapterRouter(CreateResponseController.handle)
);

export default router;