import multer from "multer";
import path from "path";
import fs from "fs";
import sanitizeFilename from "../utils/sanitizeFilename";
import { Request } from "express";

interface ModelRequest extends Request {
  modelFolder?: string;
  gltfCount?: number;
}

const isGltfFile = (file: Express.Multer.File): boolean => {
  const ext = path.extname(file.originalname).toLowerCase();
  return (
    (file.mimetype === "application/octet-stream" ||
      file.mimetype === "model/gltf-binary" ||
      file.mimetype === "model/gltf+json") &&
    (ext === ".gltf" || ext === ".glb")
  );
};

export const process3d = multer({
  storage: multer.diskStorage({
    destination: (req: ModelRequest, file, cb) => {
      if (req.modelFolder) {
        const dir = path.join(
          __dirname,
          `../../../public/uploads/models/${req.modelFolder}`
        );
        return cb(null, dir);
      }

      const parsed = path.parse(file.originalname);
      const sanitized = sanitizeFilename(parsed.name);
      req.modelFolder = sanitized.name;

      const dir = path.join(
        __dirname,
        `../../../public/uploads/models/${req.modelFolder}`
      );
      fs.mkdirSync(dir, { recursive: true });
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const sanitized = sanitizeFilename(file.originalname);
      cb(null, `${sanitized.name}${sanitized.ext}`);
    },
  }),
  fileFilter: (req: ModelRequest, file, cb) => {
    const allowedMimeTypes = [
      "model/gltf-binary",
      "model/gltf+json",
      "application/octet-stream",
      "image/png",
    ];

    if (!req.gltfCount) req.gltfCount = 0;

    if (isGltfFile(file)) {
      if (req.gltfCount > 0) {
        return cb(new Error("Only one .gltf or .glb file is allowed"));
      }
      req.gltfCount++;
      return cb(null, true);
    }

    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    cb(new Error(`Invalid file type: ${file.mimetype}`));
  },
}).array("files");

const upload3d = process3d;

export default upload3d;
