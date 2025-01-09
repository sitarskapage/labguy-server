import { Router } from "express";
import { WorkController } from "../../controllers/WorkController";
import expressAsyncHandler from "express-async-handler";

const workController = new WorkController();

const workRouter = Router();

// Single entity routes
workRouter.get("/latest", workController.getOneLatest);
workRouter.get("/:id", workController.getOne);
workRouter.post("/create", workController.create);
workRouter.post("/update/:id", workController.update);
workRouter.post("/delete/:id", workController.delete);

// Array operations (batch updates/deletes)
workRouter.get(
  "/",
  expressAsyncHandler((req, res, next) => {
    const { unique } = req.query;

    if (unique === "true") {
      // If the 'unique' query is true, call the method for unique works
      workController.getUnique(req, res, next);
    } else {
      // Otherwise, call the default get method
      workController.get(req, res, next);
    }
  })
);

workRouter.post("/createMany", workController.createMany);
workRouter.post("/updateMany", workController.updateMany);
workRouter.post("/deleteMany", workController.deleteMany);

export default workRouter;
