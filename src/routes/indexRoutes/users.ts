import { prisma } from "../../app";
import Route from "../Route";

const route = new Route(prisma.user);
const usersRoutes = route.setupCRUDRoutes();

export default usersRoutes;
