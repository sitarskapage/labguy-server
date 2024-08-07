import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../utils/generateSlug";
import { notFoundResponse, successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import TagsController from "./TagsController";

export class PostController extends Controller {
  constructor() {
    super("post");
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    const posts = await prisma.post.findMany({
      include: {
        general: true,
      },
    });
    successResponse(res, posts);
  });

  getOne = asyncHandler(async (req, res) => {
    const id: number = parseInt(req.params.id, 10);

    // Fetch the record from the database
    const record = await prisma.post.findUnique({
      where: { id: id },
      include: {
        general: { include: { tags: true } },
      },
    });

    // Check if the record exists
    if (!record) {
      return notFoundResponse(res, "Post not found");
    }

    // Initialize the HTML variable
    let html;

    // Parse the HTML JSON string if it is indeed a string

    if (record && typeof record.html === "string") {
      html = JSON.parse(record.html);
    } else {
      throw new Error("html field is not a string");
    }

    // Send the successful response with parsed HTML
    successResponse(res, { ...record, html });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const createdRecord = await prisma.post.create({
      data: {
        author: { connect: { email: req.user?.email } },
        general: {
          create: {
            title: req.body.general.title,
            slug: await generateSlug(req.body.general.title, prisma.post),
          },
        },
      },
      include: {
        general: true,
      },
    });
    successResponse(res, createdRecord);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const { general } = req.body;
    const { tags } = general;
    const postId: number = parseInt(req.params.id, 10);
    const tagsController = new TagsController();
    const upsertedTags = await tagsController.upsert(tags);
    const html = JSON.stringify(req.body.html);

    const updateData = {
      html,
      general: {
        update: {
          tags: upsertedTags && {
            set: upsertedTags.map((tag) => ({ title: tag.title })),
          },
        },
      },
    };

    const updatedRecord = await prisma.post.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: { include: { tags: true } },
      },
    });

    successResponse(res, updatedRecord);
  });
}
