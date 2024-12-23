import multer from "multer";
import path from "path";
import fs from "fs";
import sanitizeFilename from "../utils/sanitizeFilename";
import { Request } from "express";
import { publicUploadDir } from "../utils/helpers";

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
    destination: async (req: ModelRequest, file, cb) => {
      const modelFolder =
        req.modelFolder ||
        sanitizeFilename(path.parse(file.originalname).name).name;
      req.modelFolder = modelFolder;

      const dir = path.join(publicUploadDir, "models", modelFolder);

      try {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        console.log("Saving file to:", dir);
        cb(null, dir);
      } catch (error) {
        console.error("Directory creation error:", error);
        cb(error as Error, "");
      }
    },
    filename: (req, file, cb) => {
      const sanitized = sanitizeFilename(file.originalname);
      const filename = `${sanitized.name}${sanitized.ext}`;
      console.log("Saving file as:", filename);
      cb(null, filename);
    },
  }),
  fileFilter: (req: ModelRequest, file, cb) => {
    const allowedMimeTypes = [
      "model/gltf-binary",
      "model/gltf+json",
      "application/octet-stream",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
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
