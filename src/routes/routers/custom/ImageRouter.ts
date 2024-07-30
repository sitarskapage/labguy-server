import { Router } from "express";
import { ImageController } from "../../../controllers/ImageController";

const imageController = new ImageController();
const imageRouter = Router();

imageRouter.get("/", imageController.get);
imageRouter.post("/update/:etag", imageController.updateMedia);
imageRouter.post("/update", imageController.upsertMedia);

imageRouter.post("/delete", imageController.destroyImages);
imageRouter.post("/upload", imageController.uploadImages);

export default imageRouter;
