import { ProjectWorkController } from "./ProjectWorkController";
import { prisma } from "../prismaclient";
import expressAsyncHandler from "express-async-handler";
import { notFoundResponse, successResponse } from "../utils/responses";
import { parseId } from "../utils/helpers";

export class ProjectController extends ProjectWorkController {
  constructor() {
    super("project");
  }

  getOne = expressAsyncHandler(async (req, res) => {
    const parsedId = parseId(req.params.id);

    let record;

    if (typeof parsedId === "string") {
      // If the ID is a string, look up the generalSection by slug
      const generalRecord = await prisma.generalSection.findUnique({
        where: { slug: parsedId },
      });

      if (!generalRecord) return notFoundResponse(res, "Record not found");

      // Now find the project by the generalId
      record = await prisma.project.findUnique({
        where: { generalId: generalRecord.id },
        include: {
          general: {
            include: {
              tags: true,
            },
          },
          images: true,
          videos: true,
          urls: true,
          works: { include: { general: true, images: true, videos: true } },
        },
      });
    } else {
      // If the ID is a number, look up the project directly by id
      record = await prisma.project.findUnique({
        where: { id: parsedId },
        include: {
          general: {
            include: {
              tags: true,
            },
          },
          images: true,
          videos: true,
          urls: true,
          works: { include: { general: true, images: true, videos: true } },
        },
      });
    }

    if (!record) return notFoundResponse(res, "Record not found");

    successResponse(res, record);
  });

  update = expressAsyncHandler(async (req, res) => {
    const postId: number = parseInt(req.params.id, 10);
    delete req.body.id;
    delete req.body.generalId;

    const updateData = await this.updateData(req);

    const updatedRecord = await prisma.project.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: { include: { tags: true } },
        images: true,
        videos: true,
        urls: true,
      },
    });

    console.log(updatedRecord);
    successResponse(res, updatedRecord);
  });
}
