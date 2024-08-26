import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../utils/generateSlug";
import { notFoundResponse, successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import TagsController from "./TagsController";
import { parseId } from "../utils/helpers";

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
    const parsedId = parseId(req.params.id);

    let record;

    if (typeof parsedId === "string") {
      // If parsedId is a string, treat it as a slug and look up the generalSection
      const generalRecord = await prisma.generalSection.findUnique({
        where: { slug: parsedId },
      });

      if (!generalRecord) {
        return notFoundResponse(res, "Record not found");
      }

      // Use generalId from generalRecord to find the post
      record = await prisma.post.findUnique({
        where: { generalId: generalRecord.id },
        include: {
          general: { include: { tags: true } },
        },
      });
    } else {
      // If parsedId is a number, use it as the id to directly find the post
      record = await prisma.post.findUnique({
        where: { id: parsedId },
        include: {
          general: { include: { tags: true } },
        },
      });
    }

    // Check if the record exists
    if (!record) {
      return notFoundResponse(res, "Post not found");
    }

    // Initialize the content variable
    let content;

    // Parse the content JSON string if it is indeed a string
    if (record && typeof record.content === "string") {
      content = JSON.parse(record.content);
    } else {
      throw new Error("content field is not a string");
    }

    // Send the successful response with parsed content
    successResponse(res, { ...record, content });
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
    const content = JSON.stringify(req.body.content);

    const updateData = {
      content,
      general: {
        update: {
          ...general,
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
