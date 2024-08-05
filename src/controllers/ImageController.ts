import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import sanitizeFilename from "../utils/sanitizeFilename";
import { prisma } from "../prismaclient";
import { MediaType } from "@prisma/client";
import { successResponse } from "../utils/responses";
import { MediaController } from "./MediaController";
import { cloudinary } from "../cloudinary";
import fs from "fs";

export class ImageController extends MediaController {
  constructor() {
    super("imageRef");
  }

  uploadImages = asyncHandler(
    async (
      req: Request<unknown, unknown, { files: File[] }>,
      res: Response,
    ) => {
      try {
        const images = req.files as Express.Multer.File[];

        if (!images || images.length < 1) throw new Error("No files received");

        const references = await Promise.all(
          images.map(async (image) => {
            try {
              const { name: sanitizedFileName } = sanitizeFilename(
                image.originalname,
              );

              const cldRes = await cloudinary.uploader.upload(image.path, {
                public_id: sanitizedFileName,
                overwrite: true,
              });

              const tagUpserts = cldRes.tags.map((tagName) =>
                prisma.tag.upsert({
                  where: { name: tagName },
                  update: {},
                  create: { name: tagName },
                }),
              );

              const createdTags = await Promise.all(tagUpserts);

              const reference = {
                public_id: cldRes.public_id,
                etag: cldRes.etag,
                mediaType: MediaType.IMAGE,
                cld_url: cldRes.secure_url,
                path: image.path,
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

              return prisma.imageRef.upsert({
                where: { public_id: reference.public_id },
                create: reference,
                update: reference,
              });
            } catch (error) {
              console.error(
                `Error processing image ${image.originalname}:`,
                error,
              );
              throw error;
            }
          }),
        );

        successResponse(res, references);
      } catch (error) {
        console.error("Error in uploadImages handler:", error);
        res.status(500).json({ error: (error as Error).message });
      }
    },
  );

  destroyImages = asyncHandler(async (req, res) => {
    const selectedImgArr = req.body;

    for (const image of selectedImgArr) {
      const { public_id } = image;

      // Delete from Cloudinary
      await cloudinary.uploader.destroy(public_id);
      // Delete local copy
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      // Delete the image reference from the database
      await prisma.imageRef.delete({ where: { public_id: public_id } });
    }
    res.status(200).send({});
  });
}
