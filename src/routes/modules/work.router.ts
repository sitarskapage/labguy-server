import { WorkController } from "../../controllers/work.controller";
import WorkRouter from "../routers/work.router";

const workController = new WorkController();
const workRouter = new WorkRouter(workController);

export default workRouter.getRouter();
