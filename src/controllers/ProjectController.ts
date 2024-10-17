import { ProjectsOnWorksController } from "./ProjectsOnWorksController";
import { prisma } from "../prismaclient";
import expressAsyncHandler from "express-async-handler";
import { notFoundResponse, successResponse } from "../utils/responses";
import { parseId } from "../utils/helpers";
import { Prisma, ProjectsOnWorks } from "@prisma/client";

export class ProjectController extends ProjectsOnWorksController {
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
          ProjectsOnWorks: {
            include: {
              work: { include: { general: true } },
            },
            orderBy: { fIndex: "asc" },
          },
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
          ProjectsOnWorks: {
            include: {
              work: { include: { general: true } },
            },
            orderBy: { fIndex: "asc" },
          },
        },
      });
    }

    if (!record) return notFoundResponse(res, "Record not found");

    successResponse(res, record);
  });

  update = expressAsyncHandler(async (req, res) => {
    const postId: number = parseInt(req.params.id, 10);
    const reqBody = req.body;

    // Assuming updateData is a helper function for additional processing
    const updateData = await this.updateData(req);

    // Get modified rows from ProjectsOnWorks
    const modifiedRows: ProjectsOnWorks[] = req.body.ProjectsOnWorks.filter(
      (row: { modified: true }) => row.modified
    );

    // Remove unnecessary properties from the main request body
    delete req.body.id;
    delete req.body.generalId;
    delete req.body.ProjectsOnWorks;

    // Start a transaction to update both the project and modified rows in ProjectsOnWorks
    const updatedRecord = await prisma.$transaction(async (prisma) => {
      // Update the main project record first
      const updatedProject = await prisma.project.update({
        where: { id: postId },
        data: { ...reqBody, ...updateData },
        include: {
          general: { include: { tags: true } },
        },
      });

      // Loop through modified rows and update each one in the ProjectsOnWorks table
      for (const row of modifiedRows) {
        await prisma.projectsOnWorks.update({
          where: {
            projectId_workId: {
              projectId: row.projectId,
              workId: row.workId,
            },
          },
          data: { fIndex: row.fIndex },
        });
      }

      return updatedProject; // Return the updated project with all its relations
    });

    successResponse(res, updatedRecord);
  });
}
