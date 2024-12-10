import { PostController } from "../../controllers/PostController";
import { createDeafultRouter } from "../../utils/createDefaultRouter";

const postController = new PostController();
const postRouter = createDeafultRouter(postController);

export default postRouter;
