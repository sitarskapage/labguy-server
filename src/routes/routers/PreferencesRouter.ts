import { Controller } from "../../controllers/Controller";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const preferencesController = new Controller("preferences");
const preferencesRouter = createDeafultRouter(preferencesController);

export default preferencesRouter;
