import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";
import { successResponse } from "../utils/responses";

export class MediaController {
  delegate: any;

  constructor(model?: "imageRef" | "videoRef") {
    this.delegate = model && prisma[model];
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    try {
      const media = await prisma.$queryRaw`
      SELECT 
        "etag", 
        "type", 
        NULL AS "id", 
        NULL AS "vimeo_url", 
        NULL AS "sc_url", 
        NULL AS "yt_url", 
        NULL AS "title", 
        NULL AS "duration", 
        NULL AS "definition", 
        "description", 
        NULL AS "thumbnail", 
        "width", 
        "height", 
        NULL AS "player_loop", 
        NULL AS "player_muted", 
        "cld_url", 
        "filename", 
        "format", 
        "bytes", 
        "createdAt", 
        "updatedAt", 
        "preferencesId"
      FROM "ImageRef"
      
      UNION ALL
      
      SELECT 
        "etag", 
        "type", 
        "id", 
        "vimeo_url", 
        "sc_url", 
        "yt_url", 
        "title", 
        "duration", 
        "definition", 
        "description", 
        "thumbnail", 
        NULL AS "width", 
        NULL AS "height", 
        "player_loop", 
        "player_muted", 
        NULL AS "cld_url", 
        NULL AS "filename", 
        NULL AS "format", 
        NULL AS "bytes", 
        "createdAt", 
        "updatedAt", 
        "preferencesId"
      FROM "VideoRef"
      
      ORDER BY "createdAt" DESC
    `;

      // Send successful response
      successResponse(res, media as any);
    } catch (error) {
      // Handle and log the error appropriately
      console.error("Error fetching media:", error);
      res.status(500).json({ error: { message: "Internal server error" } });
    }
  });

  update = asyncHandler(async (req, res) => {
    const etag: string = req.params.etag;
    const updatedImg = req.body;

    const updated = await this.delegate.update({
      where: { etag: etag },
      data: updatedImg,
    });
    successResponse(res, updated);
  });

  upsert = asyncHandler(async (req, res) => {
    const mediaRef = await this.delegate.upsert({
      where: {
        etag: req.body.etag,
      },
      create: req.body,
      update: req.body,
    });
    successResponse(res, mediaRef);
  });

  deleteManyMedia = asyncHandler(async (req: Request, res: Response) => {
    const etags: string[] = req.body.etags;

    const deleted = await this.delegate.deleteMany({
      where: { etag: { in: etags } },
    });
    successResponse(res, deleted);
  });
}
