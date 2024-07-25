// routes.js
import { Router } from "express";
import userRouter from "./routers/default/UserRouter";
import workRouter from "./routers/post/WorkRouter";
import projectRouter from "./routers/post/ProjectRouter";
import preferencesRouter from "./routers/default/PreferencesRouter";
import postRouter from "./routers/post/PostRouter";
import { prisma } from "../client";
import asyncHandler from "express-async-handler";
import videoRouter from "./routers/custom/VideoRouter";
import profileRouter from "./routers/custom/ProfileRouter";
import imageRouter from "./routers/custom/ImageRouter";
//media paths

// New Router instance
const router = Router();

// /api/

//default paths
router.use("/users", userRouter);
router.use("/preferences", preferencesRouter);

//post paths
router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);

//custom paths
router.use("/profiles", profileRouter);
router.use("/videos", videoRouter);
router.use("/images", imageRouter);
router.get(
  "/media",
  asyncHandler(async (req, res) => {
    const imageRefs = await prisma.imageRef.findMany();
    const videoRefs = await prisma.videoRef.findMany();
    const media = [...imageRefs, ...videoRefs];
    res.status(200).json(media);
  }),
);

export default router;
