import { ProjectController } from "../../../controllers/ProjectController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const projectController = new ProjectController();
const projectRouter = createDeafultRouter(projectController);

export default projectRouter;
