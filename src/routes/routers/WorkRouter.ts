import { PostController } from "../../controllers/PostController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const userController = new PostController("post");
const workRouter = createDeafultRouter(userController);

export default workRouter;
