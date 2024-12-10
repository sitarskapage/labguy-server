import { Router } from "express";
import { ProfileController } from "../../controllers/ProfileController";

const profileController = new ProfileController();

const profileRouter = Router();

profileRouter.get("/:id", profileController.getProfile);
profileRouter.post("/update/:id", profileController.updateProfile);

export default profileRouter;
