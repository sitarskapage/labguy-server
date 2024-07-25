import { Controller } from "../../../controllers/Controller";
import { createDeafultRouter } from "./createDefaultRouter";

const preferencesController = new Controller("preferences");
const preferencesRouter = createDeafultRouter(preferencesController);

export default preferencesRouter;
