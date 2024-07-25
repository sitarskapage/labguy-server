import { Router } from "express";
import { MediaController } from "../../../controllers/MediaController";

const videoController = new MediaController("videoRef");
const videoRouter = Router();

videoRouter.get("/", videoController.getManyMedia);
videoRouter.post("/update/:etag", videoController.updateMedia);
videoRouter.post("/update", videoController.upsertMedia);
videoRouter.post("/delete", videoController.deleteManyMedia);

export default videoRouter;
