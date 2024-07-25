/*TODO:
+ AUTH
*/

import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";
import { limiter } from "./middleware/config/limiter";

// init
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

// routes
app.use("/api/", router);

// errors
app.use(errorHandler);

//server
app.listen(3000, () => {
  console.debug("App listening on 3000");
});

export default app;
