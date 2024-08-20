import expressAsyncHandler from "express-async-handler";
import { Controller } from "./Controller";
import { successResponse } from "../utils/responses";
import { prisma } from "../prismaclient";

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
      },
    });

    if (!record) {
      throw new Error("Record not found");
    }

    successResponse(res, record);
  });

  update = expressAsyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = req.body;
    const bgVideo = data.homepage_background_video[0];
    const bgImage = data.homepage_background_image[0];

    // Clean up the data object
    delete data.background;
    delete data.id;
    delete data.videoRefEtag;
    delete data.imageRefEtag;

    // Prepare the update data object with conditional logic
    const updateData = {
      ...data,
      homepage_background_image: bgImage?.etag
        ? { connect: { etag: bgImage.etag } }
        : { disconnect: true },
      homepage_background_video: bgVideo?.etag
        ? { connect: { etag: bgVideo.etag } }
        : { disconnect: true },
    };

    // Perform the update operation
    const updated = await prisma.preferences.update({
      where: { id },
      data: updateData,
      include: {
        homepage_background_image: true,
        homepage_background_video: true,
      },
    });

    successResponse(res, updated);
  });
}
