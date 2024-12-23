import multer from "multer";
import path from "path";
import fs from "fs/promises";
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
    destination: async (req: ModelRequest, file, cb) => {
      const modelFolder =
        req.modelFolder ||
        sanitizeFilename(path.parse(file.originalname).name).name;
      req.modelFolder = modelFolder;

      const rootDir = path.resolve(__dirname, "../..");

      const dir = path.join(
        rootDir,
        "public",
        "uploads",
        "models",
        modelFolder
      );

      console.log("Creating directory:", dir);

      try {
        await fs.mkdir(dir, { recursive: true });
        const stats = await fs.stat(dir);
        console.log("Directory created with permissions:", stats.mode);
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
