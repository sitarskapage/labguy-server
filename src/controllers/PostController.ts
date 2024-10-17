import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { generateSlug } from "../utils/generateSlug";
import { notFoundResponse, successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import TagsController from "./TagsController";
import { parseId } from "../utils/helpers";
import { Post } from "@prisma/client";

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

    // Determine if we are using slug or id for the query
    const query =
      typeof parsedId === "string"
        ? {
            generalId: (
              await prisma.generalSection.findUnique({
                where: { slug: parsedId },
              })
            )?.id,
          }
        : { id: parsedId };

    if (!query.generalId && !query.id) {
      return notFoundResponse(res, "Record not found");
    }

    // Fetch the record from the database
    const record = await prisma.post.findUnique({
      where: query,
      include: {
        general: { include: { tags: true } },
      },
    });

    // Check if the record exists
    if (!record) {
      return notFoundResponse(res, "Post not found");
    }

    // Parse the content if it's a string
    let content: Post["content"][] = [];

    if (typeof record.content === "string") {
      try {
        content = JSON.parse(record.content);
      } catch (error) {
        console.error("Failed to parse content JSON:", error);
        return notFoundResponse(res, "Error parsing content.");
      }
    } else if (record.content) {
      console.error(
        "Content field is not a string, the type is:",
        typeof record.content
      );
      return notFoundResponse(res, "Invalid content format.");
    }

    // Send the successful response with parsed content
    successResponse(res, { ...record, content });
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    console.log("create post", req.body);
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

  delete = asyncHandler(async (req: Request, res: Response) => {
    const generalId: number = parseInt(req.params.id, 10);

    const deleted = await prisma.generalSection.delete({
      where: { id: generalId },
    });

    successResponse(res, deleted);
  });
}
