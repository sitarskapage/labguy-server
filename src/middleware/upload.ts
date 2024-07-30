import { NextFunction, Request, Response } from "express";

export default function upload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("Hailooo");
}
