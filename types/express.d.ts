// types/express.d.ts

import { UserPayload } from "../src/middleware/auth";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
