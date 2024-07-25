import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
   if (req.method === "POST") {
       console.log("AOOOOOOOOOOOOOO");
//check token here
  }
  next();
};
