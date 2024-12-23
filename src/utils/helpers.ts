import fs from "fs/promises";
import path from "path";
import { prisma } from "../prismaclient";
import { ImageRef, ThreedRef, VideoRef } from "@prisma/client";

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

export async function getAllmedia(
  mediaList: { etag: string; mediaType: string }[]
): Promise<(ImageRef | VideoRef | ThreedRef)[]> {
  const mediaResults = await Promise.all(
    mediaList.map(async (media) => {
      switch (media.mediaType) {
        case "IMAGE":
          return await prisma.imageRef.findUnique({
            where: { etag: media.etag },
          });
        case "VIDEO":
          return await prisma.videoRef.findUnique({
            where: { etag: media.etag },
          });
        case "THREE_D":
          return await prisma.threedRef.findUnique({
            where: { etag: media.etag },
          });
        default:
          return null;
      }
    })
  );
  return mediaResults.filter(
    (media): media is ImageRef | VideoRef | ThreedRef => media !== null
  );
}
