// routes.js
import { Router } from "express";
import userRouter from "./modules/user.router";

// New Router instance
const router = Router();

// /api/

router.use("/users", userRouter);

export default router;
