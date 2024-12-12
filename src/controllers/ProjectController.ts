import { ProjectsOnWorksController } from "./ProjectsOnWorksController";
import { prisma } from "../prismaclient";
import expressAsyncHandler from "express-async-handler";
import { notFoundResponse, successResponse } from "../utils/responses";
import { parseId } from "../utils/helpers";
import { ImageRef, Prisma, ProjectsOnWorks, VideoRef } from "@prisma/client";
import { JsonArray } from "@prisma/client/runtime/library";

export class ProjectController extends ProjectsOnWorksController {
  constructor() {
    super("project");
  }
  get = expressAsyncHandler(async (req, res) => {
    const items = await prisma.project.findMany({
      select: {
        id: true,
        media: true,
        start_date: true,
        end_date: true,
        subtitle: true,
        general: {
          include: {
            tags: true,
          },
        },
        ProjectsOnWorks: {
          include: {
            work: {
              include: {
                general: {
                  include: {
                    tags: true,
                  },
                },
              },
            },
          },
          orderBy: { fIndex: "asc" },
        },
      },
      orderBy: { end_date: "asc" },
    });

    const projectsWithCover = items.map((project) => {
      let firstPhoto: string | null = null;

      // Check if project.media is an array and get the first item
      if (Array.isArray(project.media)) {
        firstPhoto = (project.media as JsonArray)[0] as string;
      }

      // If no media found, iterate through ProjectsOnWorks
      if (!firstPhoto && Array.isArray(project.ProjectsOnWorks)) {
        for (const projectOnWork of project.ProjectsOnWorks) {
          if (
            Array.isArray(projectOnWork.work.media) &&
            projectOnWork.work.media.length
          ) {
            firstPhoto = (projectOnWork.work.media as JsonArray)[0] as string;
            break;
          }
        }
      }

      return {
        ...project,
        cover: firstPhoto,
        media: null,
        ProjectsOnWorks: null,
      };
    });

    successResponse(res, projectsWithCover);
  });

  getOne = expressAsyncHandler(async (req, res) => {
    const parsedId = parseId(req.params.id);

    let record;

    if (typeof parsedId === "string") {
      // Look up by slug
      const generalRecord = await prisma.generalSection.findUnique({
        where: { slug: parsedId },
      });

      if (!generalRecord) return notFoundResponse(res, "Record not found");

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
              work: { include: { general: { include: { tags: true } } } },
            },
            orderBy: { fIndex: "asc" },
          },
        },
      });
    } else {
      // Look up by numeric ID
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
              work: { include: { general: { include: { tags: true } } } },
            },
            orderBy: { fIndex: "asc" },
          },
        },
      });
    }

    if (!record) return notFoundResponse(res, "Record not found");

    // Get related works media
    const worksMedia: string[] = record.ProjectsOnWorks.flatMap((pow) =>
      (pow.work.media as Array<{ etag: string }>)
        .filter((mediaItem) => mediaItem && mediaItem.etag)
        .map((mediaItem) => mediaItem.etag)
    );

    // Get project media (ordered)
    const projectMedia: string[] = Array.isArray(record.media)
      ? record.media
          .filter(
            (m): m is { etag: string } =>
              m !== null && typeof m === "object" && "etag" in m
          )
          .map((m) => m.etag)
      : [];

    // Create new set of ordered media
    const combinedMedia = [
      ...projectMedia,
      ...worksMedia.filter((etag) => !projectMedia.includes(etag)),
    ];

    // Fetch related media from the database (images and videos)
    const mediaRefs = await prisma.imageRef.findMany({
      where: { etag: { in: combinedMedia } },
    });
    const videoRefs = await prisma.videoRef.findMany({
      where: { etag: { in: combinedMedia } },
    });

    // Combine the images and videos
    const allMedia = [...mediaRefs, ...videoRefs];

    // Create a map by etag for quick access
    const mediaMap = new Map(allMedia.map((item) => [item.etag, item]));

    // Reorder allMedia to match the order in combinedMedia and add descriptions
    const orderedMedia = combinedMedia
      .map((etag) => mediaMap.get(etag))
      .filter((item): item is NonNullable<typeof item> => item !== undefined)
      .map(({ createdAt, updatedAt, ...rest }) => rest) //remove fields
      .map((mediaItem) => {
        // Check if media is part of project or works media

        // If it's works media, find the related work
        const relatedWork = record.ProjectsOnWorks.find((pow) =>
          (pow.work.media as Array<{ etag: string }>)
            .map((m) => m.etag)
            .includes(mediaItem.etag)
        )?.work;

        // Set description based on media type
        const description =
          relatedWork && !mediaItem.description
            ? `${relatedWork.general.title}, ${relatedWork.medium ? relatedWork.medium + ", " : ""}${relatedWork.dimensions ? relatedWork.dimensions + " cm, " : ""}${relatedWork.year ?? ""}`
            : mediaItem.description || "";

        // Return media item with description
        return {
          ...mediaItem,
          description,
        };
      });

    // Update the record with the ordered media
    record.media = orderedMedia;

    // Send updated data
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
