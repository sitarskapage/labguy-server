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
          ProjectsOnWorks: {
            include: {
              project: { include: { general: true } },
            },
          },
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
          ProjectsOnWorks: {
            include: {
              project: { include: { general: true } },
            },
          },
        },
      });
    }

    // Post-process to map projects from ProjectsOnWorks
    if (record) {
      const projects = record.ProjectsOnWorks.map((p) => p.project); // Extract the project objects

      // Add 'projects' field to the response
      const response = {
        ...record,
        projects,
      };

      successResponse(res, response);
    } else {
      return notFoundResponse(res, "Record not found");
    }
  });

  update = expressAsyncHandler(async (req, res) => {
    const workId: number = parseInt(req.params.id, 10);
    const updateData = await this.updateData(req);
    const projects = req.body.projects;
    const count = (await prisma.projectsOnWorks.count()).toString();

    // Get the project IDs from the request body
    const projectIds = projects.map((project: { id: number }) => project.id);

    // Prepare the new project connections with `fIndex`
    const projectConnections = projects.map((project: { id: number }) => ({
      projectId: project.id,
      workId: workId,
      fIndex: count, // Assuming fIndex is calculated elsewhere; if dynamic, adjust accordingly
    }));

    // Make sure to remove ID fields to avoid updating primary keys
    delete req.body.id;
    delete req.body.generalId;
    delete req.body.projects;

    // Add missing props
    const newData = {
      ...updateData,
      media: req.body.media,
    };

    // Update the work entry
    const updatedRecord = await prisma.work.update({
      where: { id: workId }, // Specify the Work ID to update
      data: newData,
      include: {
        general: { include: { tags: true } },
      },
    });

    // Remove relations that are not in the provided projects array
    await prisma.projectsOnWorks.deleteMany({
      where: {
        workId: workId,
        projectId: {
          notIn: projectIds, // Remove old relations that are not in the new project array
        },
      },
    });

    // Upsert new relations into the ProjectsOnWorks table
    await Promise.all(
      projectConnections.map(
        async (connection: { projectId: any; workId: any; fIndex: any }) => {
          await prisma.projectsOnWorks.upsert({
            where: {
              projectId_workId: {
                projectId: connection.projectId,
                workId: connection.workId,
              }, // Use compound unique constraint
            },
            update: {
              fIndex: connection.fIndex, // If the relation already exists, update `fIndex`
            },
            create: connection, // If it doesn't exist, create a new relation
          });
        }
      )
    );

    // Return a success response
    successResponse(res, updatedRecord);
  });
}
