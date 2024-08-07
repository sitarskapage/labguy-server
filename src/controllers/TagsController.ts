import { PrismaClient, Tag } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { successResponse } from "../utils/responses";

const prisma = new PrismaClient();

export default class TagsController {
  // Get all tags with related data
  get = asyncHandler(async (req, res) => {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    successResponse(res, tags);
  });

  upsert = async (tags: (Tag | string)[]) => {
    return await Promise.all(
      tags.map(async (tag) => {
        if (typeof tag !== "string") {
          const title = tag.title;
          tag = title;
        }

        const upsertedTag = await prisma.tag.upsert({
          where: { title: tag },
          update: { title: tag },
          create: { title: tag },
        });

        return upsertedTag;
      })
    );
  };

  // Delete a tag by ID
  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tag = await prisma.tag.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).send({});
  });
}
