import { Router } from "express";
import { ImageController } from "../../../controllers/ImageController";
import upload from "../../../middleware/upload";

const imageController = new ImageController();
const imageRouter = Router();

imageRouter.get("/", imageController.get);
imageRouter.post("/update/:etag", imageController.update);
imageRouter.post("/update", imageController.upsert);

imageRouter.post("/delete", imageController.destroyImages);
imageRouter.post("/upload", upload, imageController.uploadImages);

export default imageRouter;
