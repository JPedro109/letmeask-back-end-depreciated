import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSON from "../../../swagger-docs";

import user from "./user";
import room from "./room";
import question from "./question";
import response from "./response";

export const router = Router();

router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

router.use(user);
router.use(room);
router.use(question);
router.use(response);