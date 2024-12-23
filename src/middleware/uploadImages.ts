import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { saveSharpImage } from "../utils/saveSharpImage";
import multer from "multer";

export interface SavedFile extends Express.Multer.File {
  path: string;
  filename: string;
  isBright: boolean;
}
const imgMimTypeWhitelist = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const sharp = expressAsyncHandler(async (req, res, next) => {
  if (!req.files) throw new Error("no files found");
  if (!Array.isArray(req.files)) throw new Error("files are not array");

  const savedFiles = await Promise.all(
    req.files.map(async (file) => {
      const { path: filePath, filename, isBright } = await saveSharpImage(file);

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
});

const processImages = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    //validate file extensions
    if (!imgMimTypeWhitelist.includes(file.mimetype)) {
      //throw err
      return cb(
        new Error("Only .jpeg, .jpg, .png, .webp formats are allowed.")
      );
    }
    //accept
    cb(null, true);
  },
}).array("files");

const uploadImages = expressAsyncHandler(async (req, res, next) => {
  //process then call next (sharp)
  processImages(req, res, () => sharp(req, res, next));
});

export default uploadImages;
