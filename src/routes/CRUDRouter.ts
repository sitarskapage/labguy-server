import { Router } from "express";
import { Controller } from "../controllers/Controller";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export default class CRUDRouter {
  controller: Controller;

  constructor(model: Prisma.UserDelegate<DefaultArgs>) {
    this.controller = new Controller(model);
  }

  setupCRUDRoutes(): Router {
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
