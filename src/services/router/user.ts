import { Router } from "express";

import { adapterRouter } from "../../core/adapter/adapterRouter";
import { adapterMiddleware } from "../../core/adapter/adapterMiddleware";

import { authenticateUser } from "../middleware/authenticateUser";

import CreateUserController from "../../core/useCases/User/CreateUser/Controller";
import VerifyUserEmailController from "../../core/useCases/User/VerifyUserEmail/Controller";
import UserLoginController from "../../core/useCases/User/UserLogin/Controller";
import RefreshTokenController from "../../core/useCases/User/RefreshToken/Controller";
import DeleteUserController from "../../core/useCases/User/DeleteUser/Controller";
import UpdatePasswordController from "../../core/useCases/User/UpdateUserPassword/Controller";
import UpdateUsernameController from "../../core/useCases/User/UpdateUsername/Controller";
import GetUsernameController from "../../core/useCases/User/GetUsername/Controller";
import SendUserEmailUpdateLinkController from "../../core/useCases/User/SendUserEmailUpdateLink/Controller";
import UpdateUserEmailController from "../../core/useCases/User/UpdateUserEmail/Controller";
import SendUserPasswordRecoveryLinkController from "../../core/useCases/User/SendUserPasswordRecoveryLink/Controller";
import RecoverUserPasswordController from "../../core/useCases/User/RecoverUserPassword/Controller";

const router = Router();

router.post("/user/create", adapterRouter(CreateUserController.handle));
router.post("/refresh-token", adapterRouter(RefreshTokenController.handle));
router.post("/verify-email", adapterRouter(VerifyUserEmailController.handle));
router.post("/user/login", adapterRouter(UserLoginController.handle));
router.delete("/user/delete", adapterMiddleware(authenticateUser), adapterRouter(DeleteUserController.handle));
router.patch("/user/password/update", adapterMiddleware(authenticateUser), adapterRouter(UpdatePasswordController.handle));
router.post("/user/email/send-token-update-email", adapterMiddleware(authenticateUser), adapterRouter(SendUserEmailUpdateLinkController.handle));
router.patch("/update-email", adapterMiddleware(authenticateUser), adapterRouter(UpdateUserEmailController.handle));
router.post("/get-name", adapterMiddleware(authenticateUser), adapterRouter(GetUsernameController.handle));
router.patch("/update-name", adapterMiddleware(authenticateUser), adapterRouter(UpdateUsernameController.handle));
router.post("/user/password/send-token-password-recover", adapterRouter(SendUserPasswordRecoveryLinkController.handle));
router.patch("/user/password/password-recover", adapterRouter(RecoverUserPasswordController.handle));

export default router;