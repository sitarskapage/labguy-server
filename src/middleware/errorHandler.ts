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

  // Send a 500 Internal Server Error response
  res.status(500).json({ error: "Internal Server Error" });
  next();
}
