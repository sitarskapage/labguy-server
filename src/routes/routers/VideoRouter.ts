import { Controller } from "../../controllers/Controller";
import { createDeafultRouter } from "../../../utils/createDefaultRouter";

const videoController = new Controller("videoRef");
const videoRouter = createDeafultRouter(videoController);

export default videoRouter;
