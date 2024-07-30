import { WorkController } from "../../../controllers/WorkController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const workController = new WorkController();
const workRouter = createDeafultRouter(workController);

export default workRouter;
