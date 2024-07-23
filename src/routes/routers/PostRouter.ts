import { PostController } from "../../controllers/PostController";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const userController = new PostController("post");
const postRouter = createDeafultRouter(userController);

export default postRouter;
