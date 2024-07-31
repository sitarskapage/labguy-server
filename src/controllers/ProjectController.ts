import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../utils/generateSlug";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";

export class ProjectController extends Controller {
  constructor() {
    super("project");
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    const projects = await prisma.project.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    successResponse(res, projects);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const createdRecord = await prisma.project.create({
      data: {
        ...req.body,
        general: {
          create: {
            ...req.body.general,
            slug: generateSlug(req.body.general.title, prisma.project),
          },
        },
      },
    });
    successResponse(res, createdRecord);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);
    const updatedRecord = await prisma.project.update({
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

  delete = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);

    const deleted = await prisma.project.delete({
      where: { id: postId },
    });

    successResponse(res, deleted);
  });
}
