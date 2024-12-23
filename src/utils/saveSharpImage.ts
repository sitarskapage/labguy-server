import sharp from "sharp";
import path from "path";
import fs from "fs";
import sanitizeFilename from "./sanitizeFilename";
import isImageBright from "./isImageBright";
import { publicUploadDir } from "./helpers";

const imageUploadDir = path.join(publicUploadDir, "images");

if (!fs.existsSync(imageUploadDir)) {
  fs.mkdirSync(imageUploadDir, { recursive: true });
}

export async function saveSharpImage(
  file: Express.Multer.File
): Promise<{ path: string; filename: string; isBright: boolean }> {
  const sanitized = sanitizeFilename(file.originalname);
  const filename = `${sanitized.name}.jpeg`;
  const filePath = path.join(imageUploadDir, filename);

  const image = sharp(file.buffer);
  const metadata = await image.metadata();
  const maxLength = 3840; //4k

  // Check if resizing is needed
  if (
    metadata.width &&
    metadata.height &&
    (metadata.width > maxLength || metadata.height > maxLength)
  ) {
    const resizeOptions =
      metadata.width > metadata.height
        ? { width: maxLength }
        : { height: maxLength };

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
