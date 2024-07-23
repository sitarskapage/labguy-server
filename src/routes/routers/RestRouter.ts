// CRUDRouter.ts
import { Router } from "express";
import { Controller } from "../../controllers/Controller";

// Generic type for the delegate
export default class RestRouter {
  controller;

  constructor(controller: Controller) {
    this.controller = controller;
  }

  getRouter(): Router {
    const router = Router();

    // Single entity routes
    router.get("/", this.controller.get);
    router.post("/create", this.controller.create);
    router.post("/update/:id", this.controller.update);
    router.post("/delete/:id", this.controller.delete);

    // Array operations (batch updates/deletes)
    router.post("/createMany", this.controller.createMany);
    router.post("/updateMany", this.controller.updateMany);
    router.post("/deleteMany", this.controller.deleteMany);

    return router;
  }
}
