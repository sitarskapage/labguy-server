import { Router } from "express";
import { ThreedController } from "../../controllers/3dController";
import upload3d from "../../middleware/upload3d";

const threedController = new ThreedController();
const threedRouter = Router();

threedRouter.get("/", threedController.get);
threedRouter.post("/update/:public_id", threedController.update);
threedRouter.post("/upload", upload3d, threedController.upload);
threedRouter.post("/delete", threedController.deleteManyMedia);

export default threedRouter;
