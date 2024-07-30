import { NextFunction, Request, Response } from "express";
import { uploadImages } from "./config/multer";

export default function uploadImgFiles(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  uploadImages.array("files")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    next();
  });
}
