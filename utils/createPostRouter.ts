import { Router } from "express";
import { PostController } from "../src/controllers/PostController";

// Create a base router function for generic CRUD operations
export function createPostRouter<T extends PostController>(
  controller: T,
): Router {
  const router = Router();

  // Single entity routes
  router.get("/", controller.getWithNested);
  router.post("/create", controller.createWithNested);
  router.post("/update/:id", controller.updateWithNested);
  router.post("/delete/:id", controller.delete);

  // Array operations (batch updates/deletes)
  router.post("/createMany", controller.createMany);
  router.post("/updateMany", controller.updateMany);
  router.post("/deleteMany", controller.deleteMany);

  return router;
}
