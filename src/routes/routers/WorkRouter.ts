import { PostController } from "../../controllers/PostController";
import { createPostRouter } from "../../../utils/createPostRouter";

const userController = new PostController("post");
const workRouter = createPostRouter(userController);

export default workRouter;
