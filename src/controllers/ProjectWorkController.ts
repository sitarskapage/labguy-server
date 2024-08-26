import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { generateSlug } from "../utils/generateSlug";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import { Controller, LowercaseModelName } from "./Controller";
import TagsController from "./TagsController";
import { Url } from "@prisma/client";

function notEmptyArray(arr: unknown): boolean {
  return Array.isArray(arr) && arr.length > 0;
}

export abstract class ProjectWorkController extends Controller {
  delegate: any;

  constructor(model: LowercaseModelName) {
    super(model);
    this.delegate = prisma[model];
  }

  async createData(req: Request) {
    return {
      general: {
        create: {
          title: req.body.general.title,
          slug: await generateSlug(req.body.general.title, this.delegate),
        },
      },
    };
  }

  async updateData(req: Request) {
    const { general, images, videos, projects, urls } = req.body;
    const { tags } = general;
    const tagsController = new TagsController();
    const upsertedTags = await tagsController.upsert(tags);

    const updateData = {
      general: {
        update: {
          tags: {},
        },
      },
      images: {},
      videos: {},
      projects: {},
      urls: {},
    };

    if (general) {
      updateData.general = { update: general };
    }

    updateData.images = images && {
      set: images.map((img: any) => ({ etag: img.etag })),
    };

    updateData.videos = videos && {
      set: videos.map((video: any) => ({ etag: video.etag })),
    };

    updateData.urls = urls && {
      set: urls.map((url: Url) => ({ url: url.url })),
    };

    updateData.projects = projects && {
      set: projects.map((project: any) => ({ id: project.id })),
    };

    updateData.general.update.tags = upsertedTags && {
      set: upsertedTags.map((tag) => ({ title: tag.title })),
    };
    return updateData;
  }

  get = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.delegate.findMany({
      include: {
        general: true,
        images: true,
        videos: true,
      },
    });
    successResponse(res, items);
  });

  getOne = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const records = await this.delegate.findUnique({
      where: { id: id },
      include: {
        general: {
          include: {
            tags: true,
          },
        },
        images: true,
        videos: true,
      },
    });

    successResponse(res, records);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.createData(req);

    const createdRecord = await this.delegate.create({
      data,
      include: {
        general: true,
      },
    });

    successResponse(res, createdRecord);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const postId: number = parseInt(req.params.id, 10);

    const deleted = await this.delegate.delete({
      where: { id: postId },
    });

    successResponse(res, deleted);
  });
}
