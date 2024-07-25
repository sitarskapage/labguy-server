import { Router } from "express";
import { MediaController } from "../../../controllers/MediaController";

const imageController = new MediaController("imageRef");
const imageRouter = Router();

imageRouter.get("/", imageController.getManyMedia);
imageRouter.post("/update/:etag", imageController.updateMedia);
imageRouter.post("/update", imageController.upsertMedia);

imageRouter.post("/delete", imageController.destroyImages);
imageRouter.post("/upload", imageController.uploadImages);

export default imageRouter;
