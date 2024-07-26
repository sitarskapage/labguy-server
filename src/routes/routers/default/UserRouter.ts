import { Router } from "express";
import UserController from "../../../controllers/UserController";

const userRouter = Router();

// Use the defined route handler in the router
userRouter.post("/login", UserController.login);
userRouter.post("/forgot", UserController.forgot);
userRouter.post("/reset-password", UserController.reset);

export default userRouter;
