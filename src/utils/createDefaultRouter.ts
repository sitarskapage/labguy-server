import { Router } from "express";
import { Controller } from "../controllers/Controller";

// Create a base router function for generic CRUD operations
export function createDeafultRouter<T extends Controller>(
  controller: T,
): Router {
  const router = Router();

  // Single entity routes
  router.get("/", controller.get);
  router.post("/create", controller.create);
  router.post("/update/:id", controller.update);
  router.post("/delete/:id", controller.delete);

  // Array operations (batch updates/deletes)
  router.post("/createMany", controller.createMany);
  router.post("/updateMany", controller.updateMany);
  router.post("/deleteMany", controller.deleteMany);

  return router;
}
