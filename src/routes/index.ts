// routes.js
import { Router } from "express";
import userRouter from "./routers/UserRouter";
import workRouter from "./routers/WorkRouter";
import projectRouter from "./routers/ProjectRouter";
import preferencesRouter from "./routers/PreferencesRouter";
import postRouter from "./routers/PostRouter";
import { prisma } from "../client";
import asyncHandler from "express-async-handler";
import videoRouter from "./routers/VideoRouter";
import profileRouter from "./routers/ProfileRouter";

// New Router instance
const router = Router();

// /api/

//default paths
router.use("/users", userRouter);
router.use("/preferences", preferencesRouter);
router.use("/videos", videoRouter);

//post paths
router.use("/works", workRouter);
router.use("/projects", projectRouter);
router.use("/posts", postRouter);

//custom paths
router.use("/profiles", profileRouter);

router.get(
  "/media",
  asyncHandler(async (req, res) => {
    const imageRefs = await prisma.imageRef.findMany();
    const videoRefs = await prisma.videoRef.findMany();
    const media = [...imageRefs, ...videoRefs];
    res.status(200).json(media);
  }),
);

//images crud ext w cloudinary

export default router;
