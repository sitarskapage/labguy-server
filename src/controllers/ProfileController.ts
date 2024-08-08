import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { prisma } from "../prismaclient";
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

    let html_additional;

    if (profile && typeof profile.html_additional === "string") {
      html_additional = JSON.parse(profile.html_additional);
    } else {
      throw new Error("html field is not a string");
    }

    res.status(200).json({ ...profile, html_additional });
  });

  // UPDATE SINGLE
  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id, 10);
    const p = req.body;
    const cArr = p.contact;
    const html_additional = JSON.stringify(req.body.html_additional);

    if (!Array.isArray(cArr)) throw new Error("Contact field is not an array");

    async function updateProfile() {
      delete p.contact;
      await prisma.profile.update({
        where: { userId: userId },
        data: { ...p, html_additional },
      });
    }

    async function updateContact() {
      // Ensure we delete contacts that are not in the received array
      await prisma.contact.deleteMany({
        where: {
          profileId: userId,
          NOT: cArr.map((cItem: Prisma.ContactWhereUniqueInput) => ({
            id: cItem.id,
          })),
        },
      });

      // overwrite
      for (const cItem of cArr) {
        await prisma.contact.upsert({
          where: { id: cItem.id || 0 },
          update: {
            email: cItem.email,
            profileId: userId,
            socialmedia: {
              deleteMany: {
                contactId: cItem.id,
                NOT: cItem.socialmedia.map(
                  (smItem: Prisma.SocialMediaWhereUniqueInput) => ({
                    id: smItem.id,
                  })
                ),
              },
              upsert: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  where: { id: smItem.id || 0 },
                  create: {
                    platform: smItem.platform,
                    profileUrl: smItem.profileUrl,
                    username: smItem.username,
                  },
                  update: {
                    platform: smItem.platform,
                    profileUrl: smItem.profileUrl,
                    username: smItem.username,
                  },
                })
              ),
            },
          },
          create: {
            email: cItem.email,
            profileId: userId,
            socialmedia: {
              create: cItem.socialmedia.map(
                (smItem: Prisma.SocialMediaCreateManyInput) => ({
                  platform: smItem.platform,
                  profileUrl: smItem.profileUrl,
                  username: smItem.username,
                })
              ),
            },
          },
        });
      }
    }

    await updateProfile();
    await updateContact();

    res.status(200).send({});
  });
}
