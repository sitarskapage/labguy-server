import { NextFunction, Request, Response } from "express";
import path from "path";
import sanitizeFilename from "../utils/sanitizeFilename";
import fs from "fs";
import sharp from "sharp";

export const optimizeAndSaveImgs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.files) {
    try {
      const publicUploadDir = path.join(
        __dirname,
        "public",
        "uploads",
        "images",
      );

      if (!fs.existsSync(publicUploadDir)) {
        fs.mkdirSync(publicUploadDir, { recursive: true });
      }

      const optimizedFiles = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const sanitized = sanitizeFilename(file.originalname);
          const filename = `${Date.now()}-${sanitized.name}.jpeg`;
          const filePath = path.join(publicUploadDir, filename);

          const image = sharp(file.buffer);
          const metadata = await image.metadata();

          const resizeOptions =
            metadata.width &&
            metadata.height &&
            metadata.width > metadata.height
              ? { width: 2160 }
              : { height: 2160 };

          await image
            .resize(resizeOptions) // Resize image if necessary
            .jpeg({ quality: 80 }) // Convert to .jpeg format and set quality
            .toFile(filePath);

          return {
            ...file,
            path: filePath,
            filename: filename,
          };
        }),
      );

      req.files = optimizedFiles;

      next();
    } catch (error) {
      throw error;
    }
  } else {
    next();
  }
};
