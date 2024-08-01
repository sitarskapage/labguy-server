import { Request } from "express";
import { ProjectWorkController } from "./ProjectWorkController";
import { generateSlug } from "../utils/generateSlug";
import { prisma } from "../prismaclient";

export class ProjectController extends ProjectWorkController {
  constructor() {
    super("project");
  }

  async createData(req: Request) {
    return {
      general: {
        create: {
          title: req.body.general.title,
          slug: await generateSlug(req.body.general.title, prisma.project),
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
