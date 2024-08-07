import { ProjectWorkController } from "./ProjectWorkController";
import { prisma } from "../prismaclient";
import expressAsyncHandler from "express-async-handler";
import { successResponse } from "../utils/responses";

export class ProjectController extends ProjectWorkController {
  constructor() {
    super("project");
  }

  update = expressAsyncHandler(async (req, res) => {
    const postId: number = parseInt(req.params.id, 10);
    delete req.body.id;
    delete req.body.generalId;
    console.log("RECEIVED DATA:", req.body);

    const updateData = await this.updateData(req);

    console.log("updateData:", updateData);
    const updatedRecord = await prisma.project.update({
      where: { id: postId },
      data: updateData,
      include: {
        general: { include: { tags: true } },
        images: true,
        videos: true,
      },
    });

    successResponse(res, updatedRecord);
  });
}
