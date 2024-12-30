import { Router } from "express";
import { ProjectController } from "../../controllers/ProjectController";

const projectController = new ProjectController();
const projectRouter = Router();

// Single entity routes
projectRouter.get("/:id", projectController.getOne);
projectRouter.post("/create", projectController.create);
projectRouter.post("/update/:id", projectController.update);
projectRouter.post("/delete/:id", projectController.delete);

// Array operations (batch updates/deletes)
projectRouter.get("/", projectController.get);
projectRouter.post("/createMany", projectController.createMany);
projectRouter.post("/updateMany", projectController.updateMany);
projectRouter.post("/deleteMany", projectController.deleteMany);

export default projectRouter;
