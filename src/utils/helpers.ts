import fs from "fs/promises";
import path from "path";

/*isNaN(parsed): This checks if the result of the conversion is NaN (Not a Number). If it is NaN, it means the string didn't represent a valid number, so the original string is returned.*/
export function parseId(id: string): string | number {
  const parsed = Number(id);
  return isNaN(parsed) ? id : parsed;
}

export const getAllFilesSize = async (dirPath: string): Promise<number> => {
  const files = await fs.readdir(dirPath);
  const sizes = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dirPath, file);
      const stats = await fs.stat(filePath);
      return stats.isFile() ? stats.size : 0;
    })
  );
  return sizes.reduce((total, size) => total + size, 0);
};
