import { createPostRouter } from "./createPostRouter";
import { PostController } from "../../../controllers/PostController";

const userController = new PostController("post");
const postRouter = createPostRouter(userController);

export default postRouter;
