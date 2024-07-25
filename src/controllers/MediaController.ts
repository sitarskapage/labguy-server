import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from "cloudinary";
import sanitizeFilename from "../utils/sanitizeFilename";
import { prisma } from "../client";
import { MediaType } from "@prisma/client";

export class MediaController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delegate: any;

  constructor(model: "imageRef" | "videoRef") {
    this.delegate = prisma[model];
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
            alt: "",
            dimensions: `${cldRes.width}px x ${cldRes.height}px`,
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

      res.status(201).json(references);
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

  updateMedia = asyncHandler(async (req, res) => {
    const etag: string = req.params.etag;

    const updatedImg = req.body;

    const updated = await this.delegate.update({
      where: { etag: etag },
      data: updatedImg,
    });
    res.status(200).json(updated);
  });

  upsertMedia = asyncHandler(async (req, res) => {
    const mediaRef = await this.delegate.upsert({
      where: {
        etag: req.body.etag,
      },
      create: req.body,
      update: req.body,
    });
    res.status(201).json(mediaRef);
  });

  getManyMedia = asyncHandler(async (req: Request, res: Response) => {
    const records = await this.delegate.findMany();
    res.status(200).json(records);
  });

  deleteMany = asyncHandler(async (req: Request, res: Response) => {
    const etags: string[] = req.body.etags;

    const deleted = await this.delegate.deleteMany({
      where: { etag: { in: etags } },
    });

    res.status(200).json(deleted);
  });
}
