import { Prisma } from "@prisma/client";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

// Define the error handler middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Log the error stack for debugging
  console.error(err.stack);

  // Check for Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = err?.meta?.target;

      res.status(409).json({
        error: {
          message: `${target ? target : "Value"} is already in use.`,
        },
      });
      return; // Ensure the function stops here and does not fall through
    }
  }

  // Send a 500 Internal Server Error response
  res.status(500).json({ error: { message: "Internal Server Error" } });
  //
  next();
};

export default errorHandler;
