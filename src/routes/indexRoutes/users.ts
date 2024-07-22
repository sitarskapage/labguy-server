import { prisma } from "../../app";
import CRUDRouter from "../CRUDRouter";

const router = new CRUDRouter(prisma.user);
const usersRoutes = router.setupCRUDRoutes();

export default usersRoutes;
