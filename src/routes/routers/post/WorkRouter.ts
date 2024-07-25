import { PostController } from "../../../controllers/PostController";
import { createPostRouter } from "./createPostRouter";

const userController = new PostController("post");
const workRouter = createPostRouter(userController);

export default workRouter;
