// routes.js
import { Router } from "express";
import userRouter from "./modules/user.router";
import workRouter from "./modules/work.router";

// New Router instance
const router = Router();

// /api/

router.use("/users", userRouter);
router.use("/works", workRouter);

export default router;
