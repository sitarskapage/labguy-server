import { Router } from "express";
import { Controller } from "../../../controllers/Controller";
import { authVerify } from "../../../middleware/auth";

const preferencesController = new Controller("preferences");
const preferencesRouter = Router();

// Single entity routes
preferencesRouter.get("/", authVerify, preferencesController.getOneLatest);
preferencesRouter.post("/create", preferencesController.create);
preferencesRouter.post("/update/:id", preferencesController.update);
preferencesRouter.post("/delete/:id", preferencesController.delete);

export default preferencesRouter;
