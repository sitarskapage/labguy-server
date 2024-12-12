import { NextFunction, Request, Response } from "express";
import { processImages } from "./config/multer";
import expressAsyncHandler from "express-async-handler";
import { saveSharpImage } from "../utils/saveSharpImage";
import multer from "multer";

export interface SavedFile extends Express.Multer.File {
  path: string;
  filename: string;
  isBright: boolean;
}

const processImagesMiddleware = expressAsyncHandler(async (req, res, next) => {
  processImages.array("files")(req, res, (err) => {
    if (err) {
      // Handle multer errors
      if (err instanceof multer.MulterError) {
        // Multer-specific error (e.g., file size limit exceeded)
        return res.status(400).json({ error: { message: err.message } });
      }

      // General error (e.g., invalid file type)
      return res.status(400).json({ error: { message: err.message } });
    }

    // Proceed if no errors (files passed validation)
    saveSharpImagesMiddleware(req, res, next);
  });
});

export const saveSharpImagesMiddleware = expressAsyncHandler(
  async (req, res, next) => {
    if (!req.files) throw new Error("no files found");
    if (!Array.isArray(req.files)) throw new Error("files  are not array");

    const savedFiles = await Promise.all(
      req.files.map(async (file) => {
        const {
          path: filePath,
          filename,
          isBright,
        } = await saveSharpImage(file);

        return {
          ...file,
          path: filePath,
          filename,
          isBright,
        };
      })
    );

    req.files = savedFiles;

    next();
  }
);

const uploadImages = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    processImagesMiddleware(req, res, next);
  }
);

export default uploadImages;
