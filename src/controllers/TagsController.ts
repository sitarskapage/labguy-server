import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { successResponse } from "../utils/responses";

const prisma = new PrismaClient();

export default class TagsController {
  // Get all tags with related data
  get = asyncHandler(async (req, res) => {
    const tags = await prisma.tag.findMany({
      include: {
        images: true, // Fetch related images if needed
        videos: true, // Fetch related videos if needed
        general: true, // Fetch related general sections if needed
      },
    });
    successResponse(res, tags);
  });

  // Delete a tag by ID
  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tag = await prisma.tag.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200);
  });
}
