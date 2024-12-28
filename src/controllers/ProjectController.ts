import { ProjectsOnWorksController } from "./ProjectsOnWorksController";
import { prisma } from "../prismaclient";
import expressAsyncHandler from "express-async-handler";
import {
  badRequestResponse,
  notFoundResponse,
  successResponse,
} from "../utils/responses";
import { getAllmedia, parseId } from "../utils/helpers";
import {
  ImageRef,
  Prisma,
  Project,
  ProjectsOnWorks,
  VideoRef,
} from "@prisma/client";
import { Request, Response } from "express";
import { JsonArray } from "@prisma/client/runtime/library";

export class ProjectController extends ProjectsOnWorksController {
  constructor() {
    super("project");
  }
  private getOneBySlugOrId = async (req: Request, res: Response) => {
    const parsedId = parseId(req.params.id);
    let record;
    if (typeof parsedId === "string") {
      // Look up by slug
      const generalRecord = await prisma.generalSection.findUnique({
        where: { slug: parsedId },
      });

      if (!generalRecord) return notFoundResponse(res, "Record not found");

      return await prisma.project.findUnique({
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
      return prisma.project.findUnique({
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
  };

  get = expressAsyncHandler(async (req, res) => {
    const items = await prisma.project.findMany({
      select: {
        generalId: true,
        id: true,
        media: true,
        start_date: true,
        end_date: true,
        venue: true,
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

  getOne = expressAsyncHandler(async (req, res, next) => {
    const record = await this.getOneBySlugOrId(req, res);
    if (!record) {
      badRequestResponse(res, "Record not found");
      return;
    }

    // Get related works media
    const worksMedia = record.ProjectsOnWorks.flatMap((pow) =>
      (pow.work.media as Array<{ etag: string; mediaType: string }>)
        .filter(
          (mediaItem) => mediaItem && mediaItem.etag && mediaItem.mediaType
        )
        .map((mediaItem) => ({
          etag: mediaItem.etag,
          mediaType: mediaItem.mediaType,
        }))
    );

    // Get project media (ordered)
    const projectMedia = Array.isArray(record.media)
      ? record.media
          .filter(
            (m): m is { etag: string; mediaType: string } =>
              m !== null &&
              typeof m === "object" &&
              "etag" in m &&
              "mediaType" in m
          )
          .map((m) => ({ etag: m.etag, mediaType: m.mediaType }))
      : [];

    // Create new set of ordered media
    const combinedMedia = [
      ...projectMedia,
      ...worksMedia.filter(
        (wm) => !projectMedia.some((pm) => pm.etag === wm.etag)
      ),
    ];

    const media = await getAllmedia(combinedMedia);

    // add descriptions
    const processedMedia = media
      .map((mediaItem) => {
        if (!mediaItem) return null;

        // Check if media is part of project or works media If it's works media, find the related work
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
      })
      .filter(Boolean);

    // Send updated data
    successResponse(res, { ...record, media: processedMedia });
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
