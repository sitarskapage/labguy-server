import { Controller } from "../../../controllers/Controller";
import { createDeafultRouter } from "./createDefaultRouter";
const userController = new Controller("user");
const userRouter = createDeafultRouter(userController);

export default userRouter;
