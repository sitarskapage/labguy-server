import { Router } from "express";
import PreferencesController from "../../controllers/PreferencesController";

const preferencesController = new PreferencesController();
const preferencesRouter = Router();

// Single entity routes
preferencesRouter.get("/", preferencesController.get);
preferencesRouter.post("/create", preferencesController.create);
preferencesRouter.post("/update/:id", preferencesController.update);
preferencesRouter.post("/delete/:id", preferencesController.delete);

export default preferencesRouter;
