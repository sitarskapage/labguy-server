import sharp from "sharp";
import path from "path";
import fs from "fs";
import sanitizeFilename from "./sanitizeFilename";
import isImageBright from "./isImageBright";

const publicUploadDir = path.resolve("public", "uploads", "images");

if (!fs.existsSync(publicUploadDir)) {
  fs.mkdirSync(publicUploadDir, { recursive: true });
}

export async function saveSharpImage(
  file: Express.Multer.File
): Promise<{ path: string; filename: string; isBright: boolean }> {
  const sanitized = sanitizeFilename(file.originalname);
  const filename = `${sanitized.name}.jpeg`;
  const filePath = path.join(publicUploadDir, filename);

  const image = sharp(file.buffer);
  const metadata = await image.metadata();

  // Check if resizing is needed
  if (
    metadata.width &&
    metadata.height &&
    (metadata.width > 2160 || metadata.height > 2160)
  ) {
    const resizeOptions =
      metadata.width > metadata.height ? { width: 2160 } : { height: 2160 };

    await image.resize(resizeOptions).jpeg({ quality: 80 }).toFile(filePath);
  } else {
    // Save the file as is if no resizing is required
    await image.jpeg({ quality: 80 }).toFile(filePath);
  }

  //
  const isBright = await isImageBright(file.buffer);

  return {
    path: filePath,
    filename: filename,
    isBright: isBright,
  };
}
