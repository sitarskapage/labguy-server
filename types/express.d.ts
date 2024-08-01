// types/express.d.ts

import { Prisma } from "@prisma/client";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { email: string };
    }
  }
}
