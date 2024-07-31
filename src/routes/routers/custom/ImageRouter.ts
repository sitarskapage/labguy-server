import { Router } from "express";
import { ImageController } from "../../../controllers/ImageController";
import uploadImages from "../../../middleware/uploadImages";

const imageController = new ImageController();
const imageRouter = Router();

imageRouter.get("/", imageController.get);
imageRouter.post("/update/:etag", imageController.update);
imageRouter.post("/update", imageController.upsert);

imageRouter.post("/destroy", imageController.destroyImages);
imageRouter.post("/upload", uploadImages, imageController.uploadImages);

export default imageRouter;
