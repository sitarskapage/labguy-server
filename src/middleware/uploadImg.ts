import { NextFunction, Request, Response } from "express";
import { processImages } from "./config/multer";
import { optimizeAndSaveImgs } from "./optimizeImg";

export default function uploadImgFiles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  processImages.array("files")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    optimizeAndSaveImgs(req, res, next);
  });
}
