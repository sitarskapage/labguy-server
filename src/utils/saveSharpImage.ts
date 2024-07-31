import sharp from "sharp";
import path from "path";
import fs from "fs";
import sanitizeFilename from "./sanitizeFilename";

const publicUploadDir = path.resolve("public", "uploads", "images");

if (!fs.existsSync(publicUploadDir)) {
  fs.mkdirSync(publicUploadDir, { recursive: true });
}

export async function saveSharpImage(
  file: Express.Multer.File,
): Promise<{ path: string; filename: string }> {
  const sanitized = sanitizeFilename(file.originalname);
  const filename = `${sanitized.name}.jpeg`;
  const filePath = path.join(publicUploadDir, filename);

  const image = sharp(file.buffer);
  const metadata = await image.metadata();

  const resizeOptions =
    metadata.width && metadata.height && metadata.width > metadata.height
      ? { width: 2160 }
      : { height: 2160 };

  await image.resize(resizeOptions).jpeg({ quality: 80 }).toFile(filePath);

  return {
    path: filePath,
    filename: filename,
  };
}
