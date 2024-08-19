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
    const background = req.body.background && req.body.background[0];
    const data = req.body;

    // Clean up the data object
    delete data.background;
    delete data.id;
    delete data.videoRefEtag;
    delete data.imageRefEtag;

    // Prepare the update data object
    const updateData = {
      ...data,
      homepage_background_image:
        background && background.mediaType == "IMAGE"
          ? { connect: { etag: background.etag } }
          : undefined,
      homepage_background_video:
        background && background.mediaType == "VIDEO"
          ? { connect: { etag: background.etag } }
          : undefined,
    };

    // Perform the update operation
    const updated = await prisma.preferences.update({
      where: { id },
      data: updateData,
    });

    successResponse(res, updated);
  });
}
