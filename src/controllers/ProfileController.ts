import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";
import { Prisma } from "@prisma/client";

export class ProfileController {
  // READ
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const profiles = await prisma.profile.findUnique({
      where: { userId: id },
      include: {
        contact: {
          include: {
            socialmedia: true,
          },
        },
      },
    });
    res.status(200).json(profiles);
  });

  // UPDATE SINGLE
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    const p = req.body;
    const c = p.contact;

    const customConnectOrCreate = (data: any[], id: number) => {
      return data.map((item) => ({
        where: { id: id },
        create: item,
      }));
    };

    const result = await prisma.profile.update({
      include: {
        contact: {
          include: {
            socialmedia: true,
          },
        },
      },
      where: { userId: id },
      data: {
        ...p,
        contact: {
          connectOrCreate: c.map((citem: { socialmedia: [] }) => {
            return {
              where: { id: id },
              create: {
                ...citem,
                socialmedia: {
                  connectOrCreate: citem.socialmedia.map((smitem: object) => {
                    return { where: { id: id }, create: smitem };
                  }),
                },
              },
            };
          }),
        },
      },
    });
    console.log(result);
    res.status(200).json(result);
  });
}
