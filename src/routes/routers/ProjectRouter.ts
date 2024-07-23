import { PostController } from "../../controllers/PostController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const userController = new PostController("post");
const projectRouter = createDeafultRouter(userController);

export default projectRouter;
