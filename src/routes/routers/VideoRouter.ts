import { Router } from "express";
import { VideoController } from "../../controllers/VideoController";

const videoController = new VideoController();
const videoRouter = Router();

videoRouter.get("/", videoController.get);
videoRouter.post("/update/:etag", videoController.update);
videoRouter.post("/create", videoController.upsert);
videoRouter.post("/delete", videoController.deleteManyMedia);

export default videoRouter;
