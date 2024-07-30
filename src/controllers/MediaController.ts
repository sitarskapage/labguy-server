import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";
import { successResponse } from "../utils/responses";

export class MediaController {
  delegate: any;

  constructor(model: "imageRef" | "videoRef") {
    this.delegate = prisma[model];
  }

  updateMedia = asyncHandler(async (req, res) => {
    const etag: string = req.params.etag;

    const updatedImg = req.body;

    const updated = await this.delegate.update({
      where: { etag: etag },
      data: updatedImg,
    });
    successResponse(res, updated);
  });

  upsertMedia = asyncHandler(async (req, res) => {
    const mediaRef = await this.delegate.upsert({
      where: {
        etag: req.body.etag,
      },
      create: req.body,
      update: req.body,
    });
    successResponse(res, mediaRef);
  });

  get = asyncHandler(async (req: Request, res: Response) => {
    const records = await this.delegate.findMany();
    successResponse(res, records);
  });

  deleteManyMedia = asyncHandler(async (req: Request, res: Response) => {
    const etags: string[] = req.body.etags;

    const deleted = await this.delegate.deleteMany({
      where: { etag: { in: etags } },
    });
    successResponse(res, deleted);
  });
}
