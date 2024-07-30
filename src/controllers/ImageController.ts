import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import sanitizeFilename from "../utils/sanitizeFilename";
import { prisma } from "../client";
import { MediaType, Prisma } from "@prisma/client";
import { successResponse } from "../utils/responses";
import { MediaController } from "./MediaController";

export class ImageController extends MediaController {
  constructor() {
    super("imageRef");
  }

  uploadImages = asyncHandler(
    async (
      req: Request<unknown, unknown, { files: File[] }>,
      res: Response,
    ) => {
      /* Function to upload file to cld, and save reference in database. It overwrites data by default. */

      const images = req.body.files;

      if (images.length < 1) throw new Error("No files received");

      const references = await Promise.all(
        images.map(async (image: File) => {
          const { name: sanitizedFileName } = sanitizeFilename(image);

          // Upload file to Cloudinary
          const cldRes = await cloudinary.uploader.upload(
            image.webkitRelativePath,
            {
              public_id: sanitizedFileName,
              overwrite: true,
            },
          );

          // define imageRef
          const reference = {
            public_id: cldRes.public_id,
            etag: cldRes.etag,
            type: MediaType.IMAGE,
            cld_url: cldRes.url,
            filename: cldRes.original_filename,
            format: cldRes.format,
            bytes: cldRes.bytes,
            description: "",
            width: cldRes.width,
            height: cldRes.height,
            tags: cldRes.tags,
            createdAt: cldRes.created_at,
          };

          // Upsert imageRef
          const imageRefs = await prisma.imageRef.upsert({
            where: {
              public_id: reference.public_id,
            },
            create: reference,
            update: reference,
          });

          // Return references
          return imageRefs;
        }),
      );

      successResponse(res, references);
    },
  );

  destroyImages = asyncHandler(async (req, res) => {
    const selectedImgArr = req.body;

    for (const image of selectedImgArr) {
      const { public_id } = image;

      //  Delete from Cloudinary
      await cloudinary.uploader.destroy(public_id);

      // Delete the image reference from the database
      await prisma.imageRef.delete({ where: { public_id: public_id } });
    }
    res.status(200);
  });
}
