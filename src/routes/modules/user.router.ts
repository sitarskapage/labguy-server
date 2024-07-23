import { prisma } from "../../client";
import { Controller } from "../../controllers/Controller";
import RestRouter from "../routers/RestRouter";

const userService = prisma.user;
const userController = new Controller(userService);
const userRouter = new RestRouter(userController);

export default userRouter.getRouter();
