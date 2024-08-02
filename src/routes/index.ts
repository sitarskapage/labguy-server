import { Router } from "express";
import signupRouter from "./routers/default/SignupRouter";
import preferencesRouter from "./routers/custom/PreferencesRouter";
import videoRouter from "./routers/custom/VideoRouter";
import profileRouter from "./routers/custom/ProfileRouter";
import imageRouter from "./routers/custom/ImageRouter";
import mediaRouter from "./routers/custom/MediaRouter";
import postRouter from "./routers/default/PostRouter";
import projectRouter from "./routers/default/ProjectRouter";
import workRouter from "./routers/default/WorkRouter";
import tagsRouter from "./routers/default/TagsRouter";

//New Router instance
const router = Router();

// /api/

// post paths
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
