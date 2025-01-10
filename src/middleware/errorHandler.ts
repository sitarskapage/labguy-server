import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

// Define the error handler middleware
export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Log the error stack for debugging
  console.error(err.stack);

  // Check for Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = err?.meta?.target;

      return res.status(409).json({
        error: {
          message: `${target ? target : "Value"} is already in use.`,
        },
      });
    }
  }

  // Send a 500 Internal Server Error response
  res.status(500).json({ error: { message: "Internal Server Error" } });
  next();
}
