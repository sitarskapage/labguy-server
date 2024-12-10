import { Router } from "express";
import TagsController from "../../controllers/TagsController";

const tagsController = new TagsController();
const tagsRouter = Router();

tagsRouter.get("/", tagsController.get);
tagsRouter.get("/delete/:id", tagsController.delete);

export default tagsRouter;
