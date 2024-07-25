import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../utils/generateSlug";

export class PostController extends Controller {
  constructor(model: "work" | "project" | "post") {
    super(model);
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    const posts = await this.delegate.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    res.status(200).json(posts);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const createdRecord = await this.delegate.create({
      data: {
        ...req.body,
        general: {
          create: {
            ...req.body.general,
            slug: generateSlug(req.body.general.title, this.delegate),
          },
        },
      },
    });
    res.status(200).json(createdRecord);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);
    const updatedRecord = await this.delegate.update({
      where: { id: postId },
      update: { ...req.body, general: { update: req.body.general } },
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });

    res.status(200).json(updatedRecord);
  });
}
