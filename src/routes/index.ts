import { Router } from "express";
import signupRouter from "./routers/custom/SignupRouter";
import preferencesRouter from "./routers/custom/PreferencesRouter";
import videoRouter from "./routers/custom/VideoRouter";
import profileRouter from "./routers/custom/ProfileRouter";
import imageRouter from "./routers/custom/ImageRouter";
import mediaRouter from "./routers/custom/MediaRouter";
import postRouter from "./routers/page/PostRouter";
import projectRouter from "./routers/page/ProjectRouter";
import workRouter from "./routers/page/WorkRouter";
import tagsRouter from "./routers/custom/TagsRouter";

//New Router instance
const router = Router();

// /api/

// page paths
router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);

// custom paths
router.use("/preferences", preferencesRouter);
router.use("/signup", signupRouter);
router.use("/profile", profileRouter);
router.use("/videos", videoRouter);
router.use("/images", imageRouter);
router.use("/media", mediaRouter);
router.use("/tags", tagsRouter);

export default router;
