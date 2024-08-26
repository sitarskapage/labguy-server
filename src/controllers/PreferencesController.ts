import expressAsyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";
import { Url } from "@prisma/client";

export default class PreferencesController extends Controller {
  constructor() {
    super("preferences");
  }
  get = expressAsyncHandler(async (req, res) => {
    const record = await prisma.preferences.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        homepage_background_image: true,
        homepage_background_video: true,
        homepage_urls: true,
      },
    });

    if (!record) {
      throw new Error("Record not found");
    }

    // Ensure homepage_background_image and homepage_background_video are arrays
    const response = {
      ...record,
      homepage_background_image: [record.homepage_background_image],
      homepage_background_video: [record.homepage_background_video],
    };

    successResponse(res, response);
  });

  update = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const bgVideo = data.homepage_background_video[0];
    const bgImage = data.homepage_background_image[0];
    const urls = data.homepage_urls;

    // Clean up the data object
    delete data.background;
    delete data.id;
    delete data.videoRefEtag;
    delete data.imageRefEtag;

    // Prepare the update data object with conditional logic
    const updateQuery = {
      ...data,
      homepage_background_image: bgImage?.etag
        ? { connect: { etag: bgImage.etag } }
        : { disconnect: true },
      homepage_background_video: bgVideo?.etag
        ? { connect: { etag: bgVideo.etag } }
        : { disconnect: true },
      homepage_urls: {
        set: urls.map((url: Url) => ({
          url: url.url,
        })),
      },
    };

    // Perform the update operation
    const updated = await prisma.preferences.update({
      where: { id },
      data: updateQuery,
      include: {
        homepage_background_image: true,
        homepage_background_video: true,
        homepage_urls: true,
      },
    });

    const response = {
      ...updated,
      homepage_background_image: [updated.homepage_background_image],
      homepage_background_video: [updated.homepage_background_video],
    };

    successResponse(res, response);
  });
}
