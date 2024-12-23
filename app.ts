import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./src/routes";
import errorHandler from "./src/middleware/errorHandler";
import { limiter } from "./src/middleware/config/limiter";
import { authVerifyPOST } from "./src/middleware/auth";
import compression from "compression";
import { isDevMode } from "./src/utils/helpers";

// init
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan(isDevMode ? "dev" : "combined"));
app.use(limiter);

// Compress all routes
app.use(compression());

// serving static files
app.use(express.static("public"));

//verify all post requests
app.use(authVerifyPOST);

// routes
app.use("/api/", router);

// errors
app.use(errorHandler);

//listen (dev only)
isDevMode && app.listen(3000);

export default app;
