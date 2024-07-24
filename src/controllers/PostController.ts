import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../../utils/generateSlug";

export class PostController extends Controller {
  constructor(model: "work" | "project" | "post") {
    super(model);
  }

  getWithNested = asyncHandler(async (req: Request, res: Response) => {
    const posts = await this.service.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    res.status(200).json(posts);
  });

  createWithNested = asyncHandler(async (req: Request, res: Response) => {
    const createdEntry = await this.service.create({
      data: {
        ...req.body,
        general: {
          create: {
            ...req.body.general,
            slug: generateSlug(req.body.general.title, this.service),
          },
        },
      },
    });
    res.status(200).json(createdEntry);
  });

  updateWithNested = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);
    const updatedEntry = await this.service.update({
      where: { id: postId },
      update: { ...req.body, general: { update: req.body.general } },
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });

    res.status(200).json(updatedEntry);
  });
}
