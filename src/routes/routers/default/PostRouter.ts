import { PostController } from "../../../controllers/PostController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const userController = new PostController();
const postRouter = createDeafultRouter(userController);

export default postRouter;
