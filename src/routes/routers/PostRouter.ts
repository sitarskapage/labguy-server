import { createPostRouter } from "../../../utils/createPostRouter";
import { PostController } from "../../controllers/PostController";

const userController = new PostController("post");
const postRouter = createPostRouter(userController);

export default postRouter;
