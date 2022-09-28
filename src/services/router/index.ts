import { Router } from "express";

import user from "./user";
import room from "./room";
import question from "./question";
import response from "./response";

export const router = Router();

router.use(user);
router.use(room);
router.use(question);
router.use(response);