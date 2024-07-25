import { createPostRouter } from "./createPostRouter";
import { PostController } from "../../../controllers/PostController";

const userController = new PostController("post");
const projectRouter = createPostRouter(userController);

export default projectRouter;
