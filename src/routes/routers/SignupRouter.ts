import { Router } from "express";
import SignupController from "../../controllers/SignupController";
const signupRouter = Router();

// Use the defined route handler in the router
signupRouter.post("/login", SignupController.login);
signupRouter.post("/forgot", SignupController.forgot);
signupRouter.post("/reset-password", SignupController.reset);

export default signupRouter;
