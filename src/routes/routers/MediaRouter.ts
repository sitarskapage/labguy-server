import { Router } from "express";
import { prisma } from "../../prismaclient";
import { MediaController } from "../../controllers/MediaController";

const mediaRouter = Router();
const mediaController = new MediaController();

mediaRouter.get("/", mediaController.get);

export default mediaRouter;
