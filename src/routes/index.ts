import { Router } from "express";
import userRouter from "./routers/default/UserRouter";
import workRouter from "./routers/post/WorkRouter";
import projectRouter from "./routers/post/ProjectRouter";
import preferencesRouter from "./routers/default/PreferencesRouter";
import postRouter from "./routers/post/PostRouter";
import videoRouter from "./routers/custom/VideoRouter";
import profileRouter from "./routers/custom/ProfileRouter";
import imageRouter from "./routers/custom/ImageRouter";
import mediaRouter from "./routers/custom/MediaRouter";

//New Router instance
const router = Router();

// /api/

// default paths
router.use("/preferences", preferencesRouter);

// post paths
router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);

// custom paths
router.use("/user", userRouter);
router.use("/profiles", profileRouter);
router.use("/videos", videoRouter);
router.use("/images", imageRouter);
router.use("/media", mediaRouter);

export default router;
