import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../client";
import { Prisma } from "@prisma/client";

export class ProfileController {
  // READ
  getProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    const profile = await prisma.profile.findUnique({
      where: { userId: userId },
      include: {
        contact: {
          include: {
            socialmedia: true,
          },
        },
      },
    });
    res.status(200).json(profile);
  });

  // UPDATE SINGLE
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);

    const p = req.body;
    const cArr = p.contact;

    if (!Array.isArray(cArr)) throw new Error("Invalid request");

    async function updateProfile() {
      delete p.contact;
      await prisma.profile.update({
        where: { userId: userId },
        data: p,
      });
    }

    async function updateContact() {
      console.log("Received contact array:", cArr);

      for (const cItem of cArr) {
        console.log("Processing contact with ID:", cItem.id);

        await prisma.contact.upsert({
          where: {
            id: cItem.id,
            userId: 1,
          },
          update: {
            id: cItem.id,
            email: cItem.email,
            userId: userId,
            socialmedia: {
              connectOrCreate: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  where: {
                    id: smItem.id,
                  },
                  create: {
                    platform: smItem.platform,
                    profileUrl: smItem.profileUrl,
                    username: smItem.username,
                  },
                }),
              ),
            },
          },
          create: {
            email: cItem.email,
            userId: userId,
            socialmedia: {
              create: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  platform: smItem.platform,
                  profileUrl: smItem.profileUrl,
                  username: smItem.username,
                }),
              ),
            },
          },
        });
      }
    }

    updateProfile();
    updateContact();

    res.status(200);
  });
}
