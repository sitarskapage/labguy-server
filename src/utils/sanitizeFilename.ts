import path from "path";
import sanitize from "sanitize-filename";

export default function sanitizeFilename(file: File) {
  // Get the original filename and extension
  const originalname = file.name;

  // Parse the file name and extension
  const parsed = path.parse(originalname);

  // Sanitize the filename
  const sanitizedBaseName = sanitize(parsed.name);

  // Replace spaces with underscores in the sanitized filename
  const filenameSanitized = sanitizedBaseName.replace(/\s/g, "_");

  // Get the extension and sanitize it
  const extname = sanitize(parsed.ext);

  // If the extension is missing, provide a default extension
  const sanitizedExtension = extname || ".txt";

  // Return the sanitized obj
  return { name: filenameSanitized, ext: sanitizedExtension };
}
