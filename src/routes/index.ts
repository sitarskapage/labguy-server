import { Router } from "express";
import signupRouter from "./routers/SignupRouter";
import preferencesRouter from "./routers/PreferencesRouter";
import videoRouter from "./routers/VideoRouter";
import profileRouter from "./routers/ProfileRouter";
import imageRouter from "./routers/ImageRouter";
import mediaRouter from "./routers/MediaRouter";
import postRouter from "./routers/PostRouter";
import projectRouter from "./routers/ProjectRouter";
import workRouter from "./routers/WorkRouter";
import tagsRouter from "./routers/TagsRouter";
import threedRouter from "./routers/3dRouter";
import generalRouter from "./routers/GeneralRouter";
import { exec } from "child_process";
import path from "path";

//New Router instance
const router = Router();

// /api/

router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);
router.use("/preferences", preferencesRouter);
router.use("/signup", signupRouter);
router.use("/profile", profileRouter);
router.use("/videos", videoRouter);
router.use("/images", imageRouter);
router.use("/media", mediaRouter);
router.use("/tags", tagsRouter);
router.use("/models", threedRouter);

//
router.use("/general", generalRouter);
//
router.use("/check", (req, res) => {
  const scriptPath = path.join(process.cwd(), "bin", "check_node.sh");

  exec(scriptPath, (error, stdout, stderr) => {
    if (error || stderr) {
      return res.status(500).send("Internal Server Error");
    }
    res.status(200).send("OK");
  });
});

export default router;
