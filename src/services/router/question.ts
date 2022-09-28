import { Router } from "express";

import { adapterRouter } from "../../core/adapter/adapterRouter";
import { adapterMiddleware } from "../../core/adapter/adapterMiddleware";

import { authenticateUser } from "../middleware/authenticateUser";

import CreateQuestionController from "../../core/useCases/Question/CreateQuestion/Controller";
import DeleteQuestionController from "../../core/useCases/Question/DeleteQuestion/Controller";
import GetQuestionsController from "../../core/useCases/Question/GetQuestions/Controller";
import GetUserQuestionsController from "../../core/useCases/Question/GetUserQuestions/Controller";

const router = Router();

router.post(
	"/question/:roomCode",
	adapterMiddleware(authenticateUser),
	adapterRouter(CreateQuestionController.handle)
);
router.delete("/question/:questionId", adapterMiddleware(authenticateUser), adapterRouter(DeleteQuestionController.handle));
router.get("/question/:roomCode/", adapterMiddleware(authenticateUser), adapterRouter(GetQuestionsController.handle));
router.get("/question", adapterMiddleware(authenticateUser), adapterRouter(GetUserQuestionsController.handle));

export default router;