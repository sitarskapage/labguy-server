// CRUDRouter.ts
import { Router } from "express";
import { WorkController } from "../../controllers/work.controller";

// Generic type for the delegate
export default class WorkRouter {
  controller;

  constructor(controller: WorkController) {
    this.controller = controller;
  }

  getRouter(): Router {
    const router = Router();

    // Single entity routes
    router.get("/", this.controller.getIncludeAll);

    return router;
  }
}
