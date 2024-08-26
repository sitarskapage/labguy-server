import { ProjectWorkController } from "./ProjectWorkController";
import expressAsyncHandler from "express-async-handler";
import { notFoundResponse, successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import { parseId } from "../utils/helpers";

export class WorkController extends ProjectWorkController {
  constructor() {
    super("work");
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

      // Now find the work by the generalId
      record = await prisma.work.findUnique({
        where: { generalId: generalRecord.id },
        include: {
          general: {
            include: {
              tags: true,
            },
          },
          images: true,
          videos: true,
          projects: { include: { general: true } },
        },
      });
    } else {
      // If the ID is a number, look up the work directly by id
      record = await prisma.work.findUnique({
        where: { id: parsedId },
        include: {
          general: {
            include: {
              tags: true,
            },
          },
          images: true,
          videos: true,
          projects: { include: { general: true } },
        },
      });
    }

    if (!record) return notFoundResponse(res, "Record not found");

    successResponse(res, record);
  });

  update = expressAsyncHandler(async (req, res) => {
    const postId: number = parseInt(req.params.id, 10);
    const updateData = await this.updateData(req);
    delete req.body.id;
    delete req.body.generalId;

    const updatedRecord = await prisma.work.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: { include: { tags: true } },
        images: true,
        videos: true,
        projects: { include: { general: true } },
      },
    });

    successResponse(res, updatedRecord);
  });
}
