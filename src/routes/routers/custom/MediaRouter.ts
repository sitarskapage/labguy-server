import { Router } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../../../client";

const mediaRouter = Router();

mediaRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const media = await prisma.$queryRaw`
      SELECT
        "etag",
        "type",
        "cld_url" AS "url",
        "filename" AS "file_name",
        "format",
        "bytes",
        "alt",
        "dimensions" AS "dimensions_or_duration",
        "tags",
        "public_id" AS "public_or_yt_id",
        "createdAt",
        "updatedAt",
        "projectId",
        "workId",
        "preferencesId"
      FROM "ImageRef"
  
      UNION ALL
  
      SELECT
        "etag",
        "type",
        "yt_url" AS "url",
        NULL AS "file_name",
        NULL AS "format",
        NULL AS "bytes",
        NULL AS "alt",
        "duration" AS "dimensions_or_duration",
        "tags",
        "yt_url" AS "public_or_yt_id",
        "createdAt",
        "updatedAt",
        "projectId",
        "workId",
        "preferencesId"
      FROM "VideoRef"
      ORDER BY "createdAt"
    `;

    res.status(200).json(media);
  }),
);

export default mediaRouter;
