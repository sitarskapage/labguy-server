import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";
import { successResponse } from "../utils/responses";

const prisma = new PrismaClient();

export default class TagsController {
  // Get all tags with related data
  get = asyncHandler(async (req, res) => {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
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
    res.status(200).send({});
  });
}
