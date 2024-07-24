import { createPostRouter } from "../../../utils/createPostRouter";
import { PostController } from "../../controllers/PostController";

const userController = new PostController("post");
const projectRouter = createPostRouter(userController);

export default projectRouter;
