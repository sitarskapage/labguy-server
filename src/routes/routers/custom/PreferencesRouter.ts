import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { authVerify } from "../../../middleware/auth";
import PreferencesController from "../../../controllers/PreferencesController";

const preferencesController = new PreferencesController();
const preferencesRouter = Router();

// Single entity routes
preferencesRouter.get("/", authVerify, preferencesController.get);
preferencesRouter.post("/create", preferencesController.create);
preferencesRouter.post("/update/:id", preferencesController.update);
preferencesRouter.post("/delete/:id", preferencesController.delete);

export default preferencesRouter;
