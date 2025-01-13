import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import errorHandler from "./src/middleware/errorHandler";
import { limiter } from "./src/middleware/config/limiter";
import { authVerifyPOST } from "./src/middleware/auth";
import { isDevMode } from "./src/utils/helpers";
import router from "./src/routes/index";

// init
const app = express();

// Trust proxy headers
app.set("trust proxy", "127.0.0.1");

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
