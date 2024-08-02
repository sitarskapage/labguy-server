// types/express.d.ts

import { Prisma } from "@prisma/client";
import * as express from "express";
import { UserPayload } from "../src/middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
