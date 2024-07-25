/*TODO:
+ AUTH
+ Forgot password
*/

import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./routes";
import errorHandler from "./middleware/errorHandler";
import { limiter } from "./middleware/config/limiter";
import { auth } from "./utils/auth";

// init
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(limiter);

// routes

/************************************************************/
/* Apply auth middleware to all POST routes *****************/
/************************************************************/
app.use((req, res, next) => {
  if (req.method === "POST") {
    return auth(req, res, next);
  }
  next();
});
/************************************************************/

app.use("/api/", router);

// errors
app.use(errorHandler);

//server
app.listen(3000, () => {
  console.debug("App listening on 3000");
});

export default app;
