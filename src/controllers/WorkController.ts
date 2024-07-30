import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateSlug } from "../utils/generateSlug";
import { successResponse } from "../utils/responses";
import { prisma } from "../client";
import { Controller } from "./Controller";

export class WorkController extends Controller {
  constructor() {
    super("work");
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    const works = await prisma.work.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    successResponse(res, works);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const createdRecord = await prisma.work.create({
      data: {
        ...req.body,
        general: {
          create: {
            ...req.body.general,
            slug: generateSlug(req.body.general.title, prisma.work),
          },
        },
      },
    });
    successResponse(res, createdRecord);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);
    const updatedRecord = await prisma.work.update({
      where: { id: postId },
      data: { ...req.body, general: { update: req.body.general } },
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    successResponse(res, updatedRecord);
  });
}
