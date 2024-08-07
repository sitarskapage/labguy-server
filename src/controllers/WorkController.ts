import { ProjectWorkController } from "./ProjectWorkController";
import expressAsyncHandler from "express-async-handler";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";

export class WorkController extends ProjectWorkController {
  constructor() {
    super("work");
  }

  update = expressAsyncHandler(async (req, res) => {
    const postId: number = parseInt(req.params.id, 10);
    delete req.body.id;
    delete req.body.generalId;

    const updateData = await this.updateData(req);

    const updatedRecord = await prisma.work.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: { include: { tags: true } },
        images: true,
        videos: true,
        projects: true,
      },
    });

    successResponse(res, updatedRecord);
  });
}
