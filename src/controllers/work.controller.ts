import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";

export class WorkController {
  work = prisma.work;

  getIncludeAll = asyncHandler(async (req: Request, res: Response) => {
    const works = await this.work.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    res.status(200).json(works);
  });

  updateWorkWithMedia = asyncHandler(async (req: Request, res: Response) => {
    const workId = req.params.id;

    const updatedWork = await this.work.update({
      where: { id: workId },
      data: {
        images: {
          connect: imageRef.etag.map((etag) => ({ etag })),
        },
        videos: {
          connect: videoRefEtags.map((etag) => ({ etag })),
        },
      },
      include: { images: true, videos: true }, // to return the Work with the associated images and videos
    });
  });
}
