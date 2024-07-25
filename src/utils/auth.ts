import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  console.log("AOOOOOOOOOOOOOO");
  next();
};
