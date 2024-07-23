// routes.js
import { Router } from "express";
import userRouter from "./routers/UserRouter";
import workRouter from "./routers/WorkRouter";
import projectRouter from "./routers/ProjectRouter";
import preferencesRouter from "./routers/PreferencesRouter";
import postRouter from "./routers/PostRouter";

// New Router instance
const router = Router();

// /api/

router.use("/users", userRouter);
router.use("/preferences", preferencesRouter);

router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);

export default router;
