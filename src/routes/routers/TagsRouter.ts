import { Router } from "express";
import TagsController from "../../controllers/TagsController";

const tagsController = new TagsController();
const tagsRouter = Router();

tagsRouter.get("/", tagsController.get);
tagsRouter.post("/create", tagsController.updateOrCreate);
tagsRouter.post("/delete/:id", tagsController.delete);

export default tagsRouter;
