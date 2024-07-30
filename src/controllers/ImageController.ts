import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import sanitizeFilename from "../utils/sanitizeFilename";
import { prisma } from "../client";
import { MediaType } from "@prisma/client";
import { successResponse } from "../utils/responses";
import { MediaController } from "./MediaController";

export interface MulterFile extends Express.Multer.File {
  buffer: Buffer; // Only necessary if using memoryStorage
}

export class ImageController extends MediaController {
  constructor() {
    super("imageRef");
  }

  uploadImages = asyncHandler(
    async (
      req: Request<unknown, unknown, { files: File[] }>,
      res: Response,
    ) => {
      const images = req.files as MulterFile[];

      if (images.length < 1) throw new Error("No files received");

      // Process each image file
      const references = await Promise.all(
        images.map(async (image) => {
          const { name: sanitizedFileName } = sanitizeFilename(
            image.originalname,
          );

          // Upload file to Cloudinary
          const cldRes = await cloudinary.uploader.upload(image.path, {
            public_id: sanitizedFileName,
            overwrite: true,
          });

          // Process tags
          const tagUpserts = cldRes.tags.map((tagName) =>
            prisma.tag.upsert({
              where: { name: tagName },
              update: {},
              create: { name: tagName },
            }),
          );

          const createdTags = await Promise.all(tagUpserts);

          // Define imageRef
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
            tags: {
              connect: createdTags.map((tag) => ({ id: tag.id })),
            },
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

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(public_id);

      // Delete the image reference from the database
      await prisma.imageRef.delete({ where: { public_id: public_id } });
    }
    res.status(200).json({ message: "Images deleted successfully" });
  });
}
