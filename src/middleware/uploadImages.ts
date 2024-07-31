import { NextFunction, Request, Response } from "express";
import { processImages } from "./config/multer";
import expressAsyncHandler from "express-async-handler";
import { saveSharpImage } from "../utils/saveSharpImage";

const processImagesMiddleware = expressAsyncHandler(async (req, res, next) => {
  processImages.array("files")(req, res, (err) => {
    // attach files from formData to req
    if (err) {
      throw err;
    } else {
      // next save and optimize files in public dir
      saveSharpImagesMiddleware(req, res, next);
    }
  });
});

export const saveSharpImagesMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    if (!req.files) throw new Error("no files found");

    const savedFiles = await Promise.all(
      (req.files as Express.Multer.File[]).map(async (file) => {
        const { path: filePath, filename } = await saveSharpImage(file);
        return {
          ...file,
          path: filePath,
          filename: filename,
        };
      }),
    );

    req.files = savedFiles;

    next();
  },
);

const uploadImages = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    processImagesMiddleware(req, res, next);
  },
);

export default uploadImages;
