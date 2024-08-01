import { Request } from "express";
import { ProjectWorkController } from "./ProjectWorkController";
import { generateSlug } from "../utils/generateSlug";
import { prisma } from "../prismaclient";

export class WorkController extends ProjectWorkController {
  constructor() {
    super("work");
  }

  async createData(req: Request) {
    return {
      general: {
        create: {
          title: req.body.general.title,
          slug: await generateSlug(req.body.general.title, prisma.work),
        },
      },
    };
  }

  updateData(req: Request) {
    const updateData: any = { ...req.body };

    if (req.body.general) {
      updateData.general = { update: req.body.general };
    }

    if (Array.isArray(req.body.images)) {
      updateData.images = {
        update: req.body.images.map((image: any) => ({
          id: image.id,
          ...image,
        })),
      };
    }

    if (Array.isArray(req.body.videos)) {
      updateData.videos = {
        update: req.body.videos.map((video: any) => ({
          id: video.id,
          ...video,
        })),
      };
    }

    return updateData;
  }
}
